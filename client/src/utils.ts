export function getZodError(fieldErrors: Record<string, string[]>) {
  const firstFieldKey = Object.keys(fieldErrors)[0]
  const firstErrorMsg = fieldErrors[firstFieldKey]?.[0]
  return firstErrorMsg || 'Invalid input.'
}
