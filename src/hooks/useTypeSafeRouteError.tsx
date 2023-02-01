export const useTypeSafeRouteError = (fn: () => unknown): any => {
 return Object.assign({}, fn())
}
