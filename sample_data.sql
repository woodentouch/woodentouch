-- Sample data for WoodenTouch application

-- Events data
INSERT INTO `events` (`eventId`, `dateDebut`, `dateFin`, `nom`) VALUES
(1, '2025-06-01', '2025-06-07', 'Japan Expo 2025'),
(2, '2025-06-01', '2025-06-07', 'Paris Manga 2025'),
(3, '2025-06-01', '2025-06-07', 'Japan Expo 2025'),
(4, '2025-06-01', '2025-06-07', 'Paris Manga 2025');

-- Licenses data
INSERT INTO `licence` (`id_license`, `name_license`) VALUES
(1, 'One Piece'),
(2, 'Dragon Ball'),
(3, 'Support'),
(4, 'Hunter x Hunter'),
(5, 'Naruto'),
(6, 'Frieren');

-- Users data
INSERT INTO `users` (`id_user`, `email`, `name`, `password`) VALUES
(7, 'user1@example.com', 'User One', 'password1'),
(8, 'user2@example.com', 'User Two', 'password2'),
(9, 'user3@example.com', 'User Three', 'password3');

-- Products data
INSERT INTO `produit` (`id_produit`, `modele`, `taille`, `license_id`) VALUES
(1, 'Dressrosa', 'XS', 1),
(2, 'Dressrosa', 'S', 1),
(3, 'Dressrosa', 'M', 1),
(4, 'Gear5', 'XS', 1),
(5, 'Gear5', 'S', 1),
(6, 'Gear5', 'M', 1),
(7, 'Goku', 'XS', 2),
(8, 'Goku', 'S', 2),
(9, 'Goku', 'M', 2),
(10, 'Support', 'S', 3),
(11, 'Hisoka', 'XS', 4),
(12, 'Hisoka', 'S', 4),
(13, 'Hisoka', 'M', 4),
(14, 'Naruto Quatro', 'XS', 5),
(15, 'Naruto Quatro', 'S', 5),
(16, 'Naruto Quatro', 'M', 5),
(17, 'Frieren Dodo', 'XS', 6),
(18, 'Frieren Dodo', 'S', 6),
(19, 'Frieren Dodo', 'M', 6),
(20, 'Frieren Ancien Groupe', 'XS', 6),
(21, 'Frieren Ancien Groupe', 'S', 6),
(22, 'Frieren Ancien Groupe', 'M', 6);

-- Stock data
INSERT INTO `stock` (`id_stock`, `quantite`, `id_produit`) VALUES
(45, 45, 1),
(46, 10, 2),
(47, 4, 3),
(48, 25, 4),
(49, 20, 5),
(50, 1, 6),
(51, 1, 7),
(52, 6, 8),
(53, 2, 9),
(54, 34, 10),
(55, 18, 11),
(56, 2, 12),
(57, 1, 13),
(58, 20, 14),
(59, 10, 15),
(60, 13, 16),
(61, 1, 17),
(62, 10, 18),
(63, 10, 19),
(64, 1, 20),
(65, 10, 21),
(66, 1, 22);

-- Panier data
INSERT INTO `panier` (`id_panier`, `dateAjout`, `mode_paiement`, `prix_panier`, `event_id`, `user_id`) VALUES
(1, '2024-06-03', 'CB', 142, 1, 7),
(2, '2025-06-04', 'PayPal', 186, 1, 7),
(27, '2025-06-05', 'CB', 228, 2, 8),
(28, '2025-06-06', 'CB', 10, 1, 7),
(29, '2025-06-07', 'CB', 134, 1, 9),
(30, '2025-06-08', 'CB', 132, 1, 9),
(31, '2025-06-09', 'PayPal', 150, 1, 8),
(32, '2025-06-10', 'CB', 186, 2, 8),
(33, '2025-06-03', 'CB', 142, 1, 7),
(34, '2025-06-04', 'PayPal', 186, 1, 7),
(35, '2025-06-05', 'CB', 228, 2, 8),
(36, '2025-06-06', 'CB', 10, 1, 8),
(37, '2025-06-07', 'CB', 134, 1, 8),
(38, '2025-06-08', 'CB', 132, 1, 9),
(39, '2025-06-09', 'PayPal', 150, 1, 9),
(40, '2025-06-10', 'CB', 450, 2, 9);

-- Panier items data
INSERT INTO `panier_items` (`id_panier_item`, `prix_unitaire`, `quantite`, `id_panier`, `id_produit`) VALUES
(1, 14, 4, 1, 1),
(2, 38, 3, 1, 2),
(3, 80, 1, 1, 3),
(4, 14, 4, 2, 4),
(5, 38, 2, 2, 5),
(6, 80, 1, 2, 6),
(7, 14, 2, 27, 7),
(8, 38, 2, 27, 8),
(9, 80, 2, 27, 9),
(10, 2, 5, 28, 10),
(11, 14, 1, 29, 7),
(12, 80, 1, 29, 3),
(13, 2, 3, 29, 10),
(14, 14, 2, 30, 11),
(15, 38, 2, 30, 12),
(16, 80, 1, 30, 13),
(17, 14, 1, 31, 14),
(18, 38, 2, 31, 15),
(19, 80, 2, 31, 16),
(20, 14, 2, 32, 17),
(21, 38, 2, 32, 18),
(22, 14, 1, 32, 20),
(23, 38, 1, 32, 21);
