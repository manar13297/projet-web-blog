-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` TEXT NOT NULL,
    `contenu` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `published` BOOLEAN NOT NULL,
    `id_user` INTEGER NOT NULL,

    INDEX `user_article_id`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_categ` (
    `id_article` INTEGER NOT NULL,
    `id_categ` INTEGER NOT NULL,

    INDEX `article_id`(`id_article`),
    PRIMARY KEY (`id_categ`, `id_article`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorie` (
    `id` INTEGER NOT NULL,
    `nom` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaire` (
    `id` INTEGER NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `contenu` TEXT NOT NULL,
    `id_article` INTEGER NOT NULL,

    INDEX `comment_article_id`(`id_article`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL,
    `nom` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('ADMIN', 'AUTHOR') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `user_article_id` FOREIGN KEY (`id_user`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_categ` ADD CONSTRAINT `article_id` FOREIGN KEY (`id_article`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_categ` ADD CONSTRAINT `categ_id` FOREIGN KEY (`id_categ`) REFERENCES `categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `comment_article_id` FOREIGN KEY (`id_article`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
