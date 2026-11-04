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
$erros = [];
if (mb_strlen($nome) < 3) {
    $erros[] = "Informe seu nome (mínimo 3 letras).";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = "Informe um e-mail válido.";
}
if ($assunto === "") {
    $erros[] = "Selecione um assunto.";
}
if (mb_strlen($mensagem) < 10) {
    $erros[] = "A mensagem precisa ter pelo menos 10 caracteres.";
}
if (count($erros) === 0) {
    try {
        $sql = "INSERT INTO contatos (nome, email, assunto, mensagem)
                VALUES (:nome, :email, :assunto, :mensagem)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ":nome"     => $nome,
            ":email"    => $email,
            ":assunto"  => $assunto,
            ":mensagem" => $mensagem,
        ]);
    } catch (PDOException $e) {
        $erros[] = "Erro ao salvar a mensagem. Tente novamente.";
    }
}
function limpar($texto) {
    return htmlspecialchars($texto, ENT_QUOTES, "UTF-8");
}
//nao comprendi o codigo abaixo 
?> 
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato — Padaria Triguinho</title>
  <link rel="stylesheet" href="../frontend/css/estilo.css">
</head>
<body>
  <main class="secao">
    <?php if (count($erros) > 0): ?>
      <h1>Não foi possível enviar</h1>
      <ul class="lista">
        <?php foreach ($erros as $erro): ?>
          <li><?= limpar($erro) ?></li>
        <?php endforeach; ?>
      </ul>
    <?php else: ?>
      <h1>Mensagem recebida!</h1>
      <p>Obrigado, <?= limpar($nome) ?>. Responderemos no e-mail <?= limpar($email) ?>.</p>
      <p><strong>Assunto:</strong> <?= limpar($assunto) ?></p>
      <p><strong>Mensagem:</strong> <?= limpar($mensagem) ?></p>
    <?php endif; ?>
    <p><a class="botao" href="../frontend/index.html#contato">Voltar ao site</a></p>
  </main>
</body>
</html>