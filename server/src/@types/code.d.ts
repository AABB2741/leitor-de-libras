type Code =
    "ok" |                           // Ok
    "network_err" |                  // Erro de conexão - cliente ou servidor
    "empty_fields" |                 // Um ou mais campos estão vazios
    "invalid_fields" |               // Um ou mais campos possuem valores inválidos
    "invalid_media" |                // Mídia inválida
    "invalid_credentials" |          // Credenciais erradas - senha, email ou outros
    "invalid_email" |                // Endereço de e-mail inválido (geralmente quando falta um @)
    "email_already_in_use" |         // Endereço já está em uso
    "invalid_token" |                // Token de sessão inválido
    "invalid_session" |              // Erro genérico de sessão
    "password_not_match" |           // Campos de senha e confirmar senha possuem valores diferentes
    "invalid_password_length" |      // Comprimento de senha inválido - deve ser entre 8 e 32
    "invalid_code" |                 // Código inválido - geralmente código de recuperação
    "internal_server_error" |        // Erro interno no servidor
    "recovery_code_already_active" | // Código de recuperação já ativado
    "recovery_code_not_found" |      // Código de recuperação não encontrado
    "user_not_found" |               // Usuário não encontrado
    "invalid_secret" |               // Código secreto inválido
    "secret_not_sent" |              // Código secreto não enviado
    "unknown_err";                   // Erro desconhecido
