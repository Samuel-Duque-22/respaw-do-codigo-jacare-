<?php
/* ===========================================================================
   ARA0062 — recebe o formulário de contato do frontend
   Este arquivo começa vazio de propósito: o PHP entra no ciclo 8.

   No ciclo 8 ele passa a ler os campos enviados pelo formulário
   (frontend/index.html), validar do lado do servidor e gravar no banco
   usando a conexão de config/conexao.php.

   É para cá que o atributo action do formulário vai apontar:
   <form action="../backend/processa-contato.php" method="post">
   =========================================================================== */
<?php
require __DIR__ . "/config/conexao.php";

// Só aceita envio pelo formulário (método POST).
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../frontend/index.html#contato");
    exit;
}
$nome     = trim($_POST["nome"] ?? "");
$email    = trim($_POST["email"] ?? "");
$assunto  = trim($_POST["assunto"] ?? "");
$mensagem = trim($_POST["mensagem"] ?? "");