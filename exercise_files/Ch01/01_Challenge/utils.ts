/**
 * Formats a date to a string
 * @param date
 * @returns {string}
 */
function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        dateStyle: "medium"
    })
}