export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha?: string;
  turnstileToken?: string;
}

export interface ContactResponse {
  ok: boolean;
  error?: string;
  fieldErrors?: ContactFieldErrors;
}

export type ContactValidationResult =
  | { ok: true; data: ContactFormValues }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };

const SINGLE_LINE_CONTROLS = /[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/;
const MESSAGE_CONTROLS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const MAILBOX_LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_\x60{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_\x60{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

/** One practical ASCII mailbox, never a display name or recipient list. */
function isMailbox(email: string): boolean {
  if (email.length > 254) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local.length > 64 || !MAILBOX_LOCAL_PART.test(local) || domain.length > 253) {
    return false;
  }
  const labels = domain.split(".");
  const topLevel = labels[labels.length - 1];
  return labels.length >= 2 &&
    labels.every(label => DOMAIN_LABEL.test(label)) &&
    topLevel.length >= 2 &&
    !/^\d+$/.test(topLevel);
}

/** Shared by the form and API. The server always validates independently. */
export function validateContactInput(input: unknown): ContactValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, error: "Please send a valid contact form." };
  }

  const candidate = input as Record<string, unknown>;
  const fieldErrors: ContactFieldErrors = {};

  const readField = (field: ContactField): string => {
    if (typeof candidate[field] !== "string") {
      fieldErrors[field] = `Please enter your ${field}.`;
      return "";
    }
    const value = candidate[field];
    const invalidControls = field === "message"
      ? MESSAGE_CONTROLS.test(value)
      : SINGLE_LINE_CONTROLS.test(value);
    if (invalidControls) {
      fieldErrors[field] = field === "message"
        ? "Please remove unsupported control characters from your message."
        : `Please use a single line without control characters for your ${field}.`;
      return "";
    }
    return value.trim();
  };

  const name = readField("name");
  const email = readField("email");
  const subject = readField("subject");
  const message = readField("message");

  if (!fieldErrors.name && (name.length < 2 || name.length > 100)) {
    fieldErrors.name = "Use between 2 and 100 characters for your name.";
  }
  if (!fieldErrors.email && !isMailbox(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!fieldErrors.subject && (subject.length < 2 || subject.length > 160)) {
    fieldErrors.subject = "Use between 2 and 160 characters for the subject.";
  }
  if (!fieldErrors.message && (message.length < 10 || message.length > 5000)) {
    fieldErrors.message = "Your message should be between 10 and 5,000 characters.";
  }

  if (candidate._gotcha !== undefined && typeof candidate._gotcha !== "string") {
    return { ok: false, error: "Please send a valid contact form." };
  }

  let turnstileToken: string | undefined;
  if (candidate.turnstileToken !== undefined) {
    if (
      typeof candidate.turnstileToken !== "string" ||
      candidate.turnstileToken.length > 2048 ||
      SINGLE_LINE_CONTROLS.test(candidate.turnstileToken)
    ) {
      return { ok: false, error: "The security check could not be read. Please refresh and try again." };
    }
    turnstileToken = candidate.turnstileToken.trim();
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject,
      message,
      _gotcha: typeof candidate._gotcha === "string" ? candidate._gotcha.trim() : "",
      ...(turnstileToken !== undefined ? { turnstileToken } : {}),
    },
  };
}
