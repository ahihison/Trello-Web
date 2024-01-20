// sort column....
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  const orderMap = new Map(orderArray.map((item, index) => [item, index]))
  const orderedArray = [...originalArray].sort((a, b) => {
    return orderMap.get(a[key]) - orderMap.get(b[key])
  })

  return orderedArray
}