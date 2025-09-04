import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { year, searchTerm } = await request.json()

    // Mock database connection - replace with your actual database
    const { MongoClient } = require("mongodb")
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db("university")

    // Build query
    const query = {}
    if (year && year !== "all") {
      query.graduationYear = Number.parseInt(year)
    }
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { rollNumber: { $regex: searchTerm, $options: "i" } },
      ]
    }

    const graduates = await db.collection("graduates").find(query).sort({ graduationDate: -1 }).toArray()

    // Generate Excel using xlsx
    const XLSX = require("xlsx")

    const worksheetData = [
      [
        "Name",
        "Email",
        "Roll Number",
        "Department",
        "Graduation Year",
        "Final CGPA",
        "Graduation Date",
        "Phone",
        "Address",
      ],
    ]

    graduates.forEach((graduate) => {
      worksheetData.push([
        graduate.name,
        graduate.email,
        graduate.rollNumber,
        graduate.department,
        graduate.graduationYear,
        graduate.finalCGPA || "N/A",
        new Date(graduate.graduationDate).toLocaleDateString(),
        graduate.phone || "N/A",
        graduate.address || "N/A",
      ])
    })

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Graduates")

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    await client.close()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="graduates-report-${year || "all"}-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    })
  } catch (error) {
    console.error("Error generating graduates report:", error)
    return NextResponse.json({ success: false, message: "Error generating graduates report" }, { status: 500 })
  }
}
