export const requiredField = (value: string) => {
  if (value) {
    return undefined;
  }
  return 'field is required';
};

export const maxLength = (maxLength: number) => (value: string) => {
  if (value && value.length > maxLength) {
    return `max length ${maxLength}`;
  }
  return undefined;
};