// A reasonably strict (not perfect — perfect email regex doesn't exist) format check.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Common disposable/temp-mail domains people use to leave fake contact info.
// Not exhaustive — new ones appear constantly — but catches the popular ones.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "guerrillamail.biz",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "fakeinbox.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "sharklasers.com",
  "maildrop.cc",
  "mintemail.com",
  "moakt.com",
]);

export function isValidEmailFormat(email) {
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

export function isDisposableEmail(email) {
  const domain = email.trim().toLowerCase().split("@")[1];
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

// Returns null if the email is fine, or a user-facing error string if not.
export function validateEmail(email) {
  if (!isValidEmailFormat(email)) {
    return "Please enter a valid email address.";
  }
  if (isDisposableEmail(email)) {
    return "Temporary/disposable email addresses aren't accepted — please use a real one.";
  }
  return null;
}
