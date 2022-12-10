/**
 * This is a simplified logic.
 * Consider using `import isEmail from 'validator/lib/isEmail'` from
 * https://github.com/validatorjs/validator.js/blob/7376945b4ce028b65955ae57b8fccbbf3fe58467/src/lib/isEmail.js
 * for a more robust version.
 */
function isEmail(string) {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return re.test(string);
}

export function email(value) {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
}

export function projectName(value) {
  return value && value.trim().length < 3
    ? "Project name length should be atleast three characters"
    : null;
}

export function password(value) {
  return value && value.trim().length < 6
    ? "Password length should be atleast six characters"
    : null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: "Required" }),
    }),
    {}
  );
}

export function description(value) {
  return value && (value.trim().length < 10 || value.trim().length > 120)
    ? "Description length should be between 10 and 120 characters"
    : null;
}
