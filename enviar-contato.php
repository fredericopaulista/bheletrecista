<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $nome = strip_tags(trim($_POST["nome"]));
    $telefone = strip_tags(trim($_POST["telefone"]));
    $bairro = strip_tags(trim($_POST["bairro"]));
    $servico = strip_tags(trim($_POST["servico"]));
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // Validations
    if (empty($nome) || empty($telefone)) {
        http_response_code(400);
        echo "Por favor, preencha o nome e o telefone.";
        exit;
    }

    // Email Config
    $recipient = "contato@bheletricista.com.br"; // Ensure this email is correct or change it to the client's email
    $subject = "Novo Contato pelo Site: $nome";

    // Email Content
    $email_content = "Nome: $nome\n";
    $email_content .= "Telefone / WhatsApp: $telefone\n";
    $email_content .= "Bairro: $bairro\n";
    $email_content .= "Serviço Solicitado: $servico\n\n";
    $email_content .= "Descrição do Problema:\n$mensagem\n";

    // Email Headers
    $email_headers = "From: $nome <no-reply@bheletricista.com.br>\r\n"; // Ensure this domain is verified if using a mailer
    $email_headers .= "Reply-To: $telefone\r\n";

    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Obrigado! Sua mensagem foi enviada.";
    } else {
        http_response_code(500);
        echo "Oops! Algo deu errado e não conseguimos enviar sua mensagem.";
    }

} else {
    http_response_code(403);
    echo "Houve um problema com a sua solicitação, tente novamente.";
}
?>
