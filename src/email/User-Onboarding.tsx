import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  temporaryPassword: string;
}

export const UserOnboardingEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstName, email, temporaryPassword }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333333",
      backgroundColor: "#f4f4f4",
    }}
  >
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <tr>
        <td style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#333333",
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Welcome to Rotaract Galgotias Admin Portal
          </h1>
          <p style={{ fontSize: "16px", marginBottom: "20px" }}>
            Hello {firstName},
          </p>
          <p style={{ fontSize: "16px", marginBottom: "20px" }}>
            An administrator has created an account for you on the Rotaract
            Galgotias Admin Portal. Here are your login details:
          </p>
          <table
            style={{
              width: "100%",
              marginBottom: "30px",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px 0 0 4px",
                }}
              >
                Portal URL:
              </td>
              <td
                style={{
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <a
                  href="https://admin.rotaractgalgotias.org"
                  style={{ color: "#0066cc", textDecoration: "none" }}
                >
                  admin.rotaractgalgotias.org
                </a>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px 0 0 4px",
                }}
              >
                Email:
              </td>
              <td
                style={{
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                {email}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px 0 0 4px",
                }}
              >
                Temporary Password:
              </td>
              <td
                style={{
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                {temporaryPassword}
              </td>
            </tr>
          </table>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              color: "#cc0000",
              fontWeight: "bold",
            }}
          >
            Important: Please change your password immediately after your first
            login.
          </p>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <a
              href="https://admin.rotaractgalgotias.org/login"
              style={{
                display: "inline-block",
                backgroundColor: "#0066cc",
                color: "#ffffff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Log In Now
            </a>
          </div>
          <p style={{ fontSize: "14px", marginTop: "30px", color: "#666666" }}>
            If you have any questions or need assistance, please contact the
            administrator who created your account or email{" "}
            <a
              href="mailto:admin@rotaractgalgotias.org"
              style={{ color: "#0066cc", textDecoration: "none" }}
            >
              admin@rotaractgalgotias.org
            </a>
            .
          </p>
        </td>
      </tr>
      <tr>
        <td
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", color: "#666666" }}>
            This is an automated message. Please do not reply to this email.
          </p>
        </td>
      </tr>
    </table>
  </div>
);

export default function Component(
  props: EmailTemplateProps = {
    firstName: "John",
    email: "john@rotaractgalgotias.org",
    temporaryPassword: "TempPass123!",
  }
) {
  return <UserOnboardingEmailTemplate {...props} />;
}
