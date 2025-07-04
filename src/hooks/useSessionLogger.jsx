// "use client"

// import { useCallback } from "react"

// export const useSessionLogger = () => {
//     const logActivity = useCallback(async (type, description, details = {}) => {
//         try {
//             await fetch("/api/admin/session/log-activity", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     activity: {
//                         type,
//                         description,
//                         details,
//                     },
//                 }),
//             })
//         } catch (error) {
//             console.error("Error logging activity:", error)
//         }
//     }, [])

//     return { logActivity }
// }

// // Also export as default for flexibility
// export default useSessionLogger






"use client"

import { useCallback } from "react"

export const useSessionLogger = () => {
    const logActivity = useCallback(async (type, description, details = {}) => {
        try {
            await fetch("/api/admin/session/log-activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type,
                    description,
                    details,
                }),
            })
        } catch (error) {
            console.error("Error logging activity:", error)
        }
    }, [])

    return { logActivity }
}

export default useSessionLogger
