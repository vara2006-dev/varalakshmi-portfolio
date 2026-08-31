<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

$config = require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

function sendResponse($success, $message)
{
    echo json_encode([
        "success" => $success,
        "message" => $message
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


/* =========================================================
   ONLY POST
========================================================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    sendResponse(
        false,
        "Invalid request method."
    );
}


/* =========================================================
   GET FORM DATA
========================================================= */

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");


/* =========================================================
   VALIDATION
========================================================= */

if ($name === "" || $email === "" || $message === "") {

    sendResponse(
        false,
        "Please fill in all fields."
    );
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    sendResponse(
        false,
        "Please enter a valid email address."
    );
}


/* =========================================================
   LENGTH VALIDATION
========================================================= */

if (strlen($name) > 100) {

    sendResponse(
        false,
        "Name is too long."
    );
}

if (strlen($email) > 150) {

    sendResponse(
        false,
        "Email address is too long."
    );
}

if (strlen($message) > 5000) {

    sendResponse(
        false,
        "Message is too long."
    );
}


/* =========================================================
   CREATE MAILER
========================================================= */

$mail = new PHPMailer(true);


try {

    /* =====================================================
       SMTP
    ===================================================== */

    $mail->isSMTP();

    $mail->Host = "smtp.gmail.com";

    $mail->SMTPAuth = true;

    $mail->Username =
        $config["smtp_username"];

    $mail->Password =
        $config["smtp_password"];

    $mail->SMTPSecure =
        PHPMailer::ENCRYPTION_STARTTLS;

    $mail->Port = 587;

    $mail->CharSet = "UTF-8";


    /* =====================================================
       FROM
    ===================================================== */

    $mail->setFrom(
        $config["smtp_username"],
        "Varalakshmi K Portfolio"
    );


    /* =====================================================
       TO
    ===================================================== */

    $mail->addAddress(
        $config["smtp_username"],
        "Varalakshmi K"
    );


    /* =====================================================
       REPLY TO
    ===================================================== */

    $mail->addReplyTo(
        $email,
        $name
    );


    /* =====================================================
       HTML EMAIL
    ===================================================== */

    $mail->isHTML(true);


    /* =====================================================
       SUBJECT
    ===================================================== */

    $mail->Subject =
        "New Portfolio Contact - " . $name;


    /* =====================================================
       SAFE VALUES
    ===================================================== */

    $safeName =
        htmlspecialchars(
            $name,
            ENT_QUOTES,
            "UTF-8"
        );

    $safeEmail =
        htmlspecialchars(
            $email,
            ENT_QUOTES,
            "UTF-8"
        );

    $safeMessage =
        nl2br(
            htmlspecialchars(
                $message,
                ENT_QUOTES,
                "UTF-8"
            )
        );


    /* =====================================================
       EMAIL BODY
    ===================================================== */

    $mail->Body = "

    <!DOCTYPE html>

    <html>

    <body style='
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,sans-serif;
    '>

        <div style='
            max-width:650px;
            margin:30px auto;
            background:#ffffff;
            border-radius:15px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.10);
        '>

            <div style='
                padding:30px;
                background:linear-gradient(
                    135deg,
                    #1e3a8a,
                    #2563eb,
                    #06b6d4
                );
                color:white;
            '>

                <div style='
                    font-size:13px;
                    letter-spacing:1px;
                    text-transform:uppercase;
                '>
                    VARALAKSHMI K PORTFOLIO
                </div>

                <h1 style='
                    margin:10px 0 0;
                    font-size:26px;
                '>
                    New Portfolio Message
                </h1>

            </div>


            <div style='
                padding:30px;
            '>

                <h2 style='
                    color:#0f172a;
                    margin-top:0;
                '>
                    Contact Details
                </h2>


                <div style='
                    padding:15px;
                    margin-bottom:15px;
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:10px;
                '>

                    <strong style='color:#64748b;'>
                        NAME
                    </strong>

                    <div style='
                        margin-top:6px;
                        font-size:16px;
                        color:#0f172a;
                    '>
                        $safeName
                    </div>

                </div>


                <div style='
                    padding:15px;
                    margin-bottom:15px;
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:10px;
                '>

                    <strong style='color:#64748b;'>
                        EMAIL
                    </strong>

                    <div style='
                        margin-top:6px;
                        font-size:16px;
                        color:#2563eb;
                    '>
                        $safeEmail
                    </div>

                </div>


                <div style='
                    padding:18px;
                    margin-bottom:20px;
                    background:#f8fafc;
                    border-left:4px solid #2563eb;
                    border-radius:8px;
                '>

                    <strong style='color:#64748b;'>
                        MESSAGE
                    </strong>

                    <div style='
                        margin-top:8px;
                        font-size:15px;
                        line-height:1.7;
                        color:#334155;
                    '>
                        $safeMessage
                    </div>

                </div>


                <a
                    href='mailto:$safeEmail'
                    style='
                        display:inline-block;
                        padding:13px 22px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                    '
                >
                    Reply to $safeName
                </a>

            </div>


            <div style='
                padding:20px;
                background:#f8fafc;
                border-top:1px solid #e2e8f0;
                text-align:center;
                color:#64748b;
                font-size:12px;
            '>

                Sent automatically from
                Varalakshmi K Portfolio

            </div>

        </div>

    </body>

    </html>
    ";


    /* =====================================================
       PLAIN TEXT
    ===================================================== */

    $mail->AltBody =
        "NEW PORTFOLIO CONTACT\n\n" .
        "Name: " . $name . "\n\n" .
        "Email: " . $email . "\n\n" .
        "Message:\n" . $message;


    /* =====================================================
       SEND
    ===================================================== */

    $mail->send();


    /* =====================================================
       IMPORTANT SUCCESS RESPONSE
    ===================================================== */

    sendResponse(
        true,
        "✓ Thank you, $safeName! Your message has been sent successfully."
    );


}


/* =========================================================
   ERROR
========================================================= */

catch (Exception $e) {

    error_log(
        "Portfolio Mail Error: " .
        $mail->ErrorInfo
    );

    sendResponse(
        false,
        "Unable to send your message. Please try again later."
    );
}

?>