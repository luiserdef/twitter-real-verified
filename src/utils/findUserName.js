
export function findUserName (userList, target) {
  let start = 0
  let end = userList.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (userList[mid] === target) {
      return mid
    } else if (userList[mid] < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }

  return -1 // not found
}
