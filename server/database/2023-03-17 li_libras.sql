-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Mar-2023 às 17:15
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `li_libras`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `avatars`
--

CREATE TABLE `avatars` (
  `id` int(11) NOT NULL,
  `code` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `avatars`
--

INSERT INTO `avatars` (`id`, `code`, `url`) VALUES
(1, 'cat', 'https://rpbcompany.com.br/repository/lilibras/avatars/cat.jpg'),
(2, 'cat2', 'https://rpbcompany.com.br/repository/lilibras/avatars/cat2.jpg'),
(3, 'bird', 'https://rpbcompany.com.br/repository/lilibras/avatars/bird.jpg'),
(4, 'bunny', 'https://rpbcompany.com.br/repository/lilibras/avatars/bunny.jpg'),
(5, 'coala', 'https://rpbcompany.com.br/repository/lilibras/avatars/coala.jpg'),
(6, 'dino', 'https://rpbcompany.com.br/repository/lilibras/avatars/dino.jpg'),
(7, 'dog', 'https://rpbcompany.com.br/repository/lilibras/avatars/dog.jpg'),
(8, 'fox', 'https://rpbcompany.com.br/repository/lilibras/avatars/fox.jpg'),
(9, 'fox2', 'https://rpbcompany.com.br/repository/lilibras/avatars/fox2.jpg'),
(10, 'frog', 'https://rpbcompany.com.br/repository/lilibras/avatars/frog.jpg'),
(11, 'goat', 'https://rpbcompany.com.br/repository/lilibras/avatars/goat.jpg'),
(12, 'monkey', 'https://rpbcompany.com.br/repository/lilibras/avatars/monkey.jpg'),
(13, 'owl', 'https://rpbcompany.com.br/repository/lilibras/avatars/owl.jpg'),
(14, 'owl2', 'https://rpbcompany.com.br/repository/lilibras/avatars/owl2.jpg'),
(15, 'panda', 'https://rpbcompany.com.br/repository/lilibras/avatars/panda.jpg'),
(16, 'pinguin', 'https://rpbcompany.com.br/repository/lilibras/avatars/pinguin.jpg'),
(17, 'pinguin2', 'https://rpbcompany.com.br/repository/lilibras/avatars/pinguin2.jpg'),
(18, 'wolf', 'https://rpbcompany.com.br/repository/lilibras/avatars/wolf.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `logs`
--

CREATE TABLE `logs` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) DEFAULT NULL,
  `action_code` varchar(191) NOT NULL,
  `details` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `recovery_codes`
--

CREATE TABLE `recovery_codes` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `expires_in` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `password` varchar(191) NOT NULL,
  `about_me` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('03bfcd94-299d-42ad-8178-bbd6303ee7ea', '69ffcbb8f18f48e0a27686b0d1c679f7a6a1e9559aa7d8f05510ee3f4b1ba299', '2023-03-09 17:17:58.364', '20230309171757_campo_senha', NULL, NULL, '2023-03-09 17:17:57.700', 1),
('1bea2e20-da1f-4c47-80a2-10f4151909f8', '8795057f9b9a9cd1573fd406ad7ef6a99f93ce8abb234e69289e0a0d15dc187d', '2023-03-14 20:16:43.677', '20230314201642_user_id_opcional', NULL, NULL, '2023-03-14 20:16:42.993', 1),
('36312197-1409-4fae-a994-cb1ab953e4ef', 'fd22e6c543aa9a43a9c040fd73a56df33b230b9c5069c639090ec70456b6fd62', '2023-03-09 17:57:58.720', '20230309175757_avatar_opcional', NULL, NULL, '2023-03-09 17:57:57.912', 1),
('672253b9-8336-48be-ae87-042a7e97201c', '806c98461330ea6fe9ea11648aac271350c8f3e29349fcb2ac117549853c88b7', '2023-03-17 15:49:45.461', '20230317154944_alterando_id_avatars', NULL, NULL, '2023-03-17 15:49:44.187', 1),
('96417250-6748-4b89-b7d1-21bd26ab2568', '4284783911545125e9b7cab2c2ab1d4244ca67d722b8e91f42014a378ac80ef8', '2023-03-16 19:46:14.107', '20230316194612_tabela_de_avatares', NULL, NULL, '2023-03-16 19:46:12.905', 1),
('a1160372-62a9-4a80-91cb-49ea8d2186c0', '1a8f061fe0256a9f8723c9d5470457ca9fa9b3a92f91352f0db8eb21266431f5', '2023-03-07 19:37:58.465', '20230307193758_initial', NULL, NULL, '2023-03-07 19:37:58.072', 1),
('b2c7ce25-358e-43bf-87d0-9f9e282644df', '527b3cf0d7efd26fb369fbcfe1d5b7b51489df721d503c638a4c0d58c6b445ab', '2023-03-17 15:21:37.940', '20230317152137_codigo_de_recuperacao', NULL, NULL, '2023-03-17 15:21:37.481', 1),
('b96f1de0-8d83-42a8-ab17-a7b00ce6e35f', '7981729fb88c9440427636137ebea7c2b9ccfa76e213304303d49dc6472e1ba2', '2023-03-14 11:11:15.602', '20230314111115_arrumando_tabela_logs', NULL, NULL, '2023-03-14 11:11:15.021', 1),
('c2adf82e-5c4f-48f4-b396-65ce64c7f54e', 'f458b5f0033a7ef91720c3cbcd651ee2e3190ffeb1285e7973e483f644f11b35', '2023-03-13 20:24:12.352', '20230313202411_sobre_mim_usuario', NULL, NULL, '2023-03-13 20:24:11.824', 1),
('d312df28-9412-4cd1-8780-c40fa1f5375c', '3d9db46f8c9cc137bb13811e19ffc707bbd068391549993920348bd1f7df856c', '2023-03-14 11:07:18.362', '20230314110718_criando_tabela_logs', NULL, NULL, '2023-03-14 11:07:18.099', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `avatars_code_key` (`code`);

--
-- Índices para tabela `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recovery_codes`
--
ALTER TABLE `recovery_codes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Índices para tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
