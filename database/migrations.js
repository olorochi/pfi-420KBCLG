export async function migrateDbIfNeeded(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Produit (
      id INTEGER PRIMARY KEY NOT NULL,
      nom TEXT NOT NULL,
      description TEXT NOT NULL,
      prix REAL NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Client (
      id INTEGER PRIMARY KEY NOT NULL,
      nom TEXT NOT NULL,
      mdp TEXT NOT NULL,
      admin INTEGER NOT NULL DEFAULT 0,
      adresse TEXT NOT NULL,
      langue TEXT NOT NULL DEFAULT 'fr'
    );
  `);

  const count = await db.getFirstAsync('SELECT COUNT(*) as total FROM Produit');
  if (count.total === 0) {
    await db.execAsync(`
      INSERT INTO Produit (nom, description, prix, image) VALUES
        ('Nain Classique', 'Le grand classique ! Ce nain de jardin traditionnel apportera charme et bonne humeur a votre jardin.', 50.0, 'https://meilleur-nain-de-jardin.com/cdn/shop/files/Nain-de-jardin-brocante-24cm_1200x1200.jpg?v=1752138466?w=400&h=400&fit=crop'),
        ('Nains Jumeaux', 'Deux nains identiques pour le double de plaisir ! Vendu en paire.', 60.0, 'https://assets.wfcdn.com/im/68010052/compr-r85/2112/211281016/Decoration.jpg?w=400&h=400&fit=crop'),
        ('Couple de Nains', 'Un adorable couple de nains main dans la main.', 70.0, 'https://m.media-amazon.com/images/I/91G+9h7v3PL.jpg?w=400&h=400&fit=crop'),
        ('Nain qui dort', 'Ce petit gaillard a bien merite son repos sur son champignon.', 80.0, 'https://m.media-amazon.com/images/I/61x7YqpeIOL.jpg?w=400&h=400&fit=crop'),
        ('Nain avec fleurs', 'Ce nain passionne de jardinage porte un bouquet de fleurs colorees.', 90.0, 'https://moodlab.store/cdn/shop/files/IMG_5706-1-1_2048x.jpg?v=1692116907?w=400&h=400&fit=crop'),
        ('Nain de Blanche Neige', 'Directement sorti du conte de fees ! Une piece collector.', 100.0, 'https://s7d1.scene7.com/is/image/dolgen/dg-40123901-7?w=400&h=400&fit=crop'),
        ('Nain en Or', 'La piece maitresse de votre collection ! Edition limitee.', 200.0, 'https://www.brownandginger.com/cdn/shop/files/fa3a0695-a517-4e9c-a391-ff31ad8015f9_1200x1200@2x.jpg?v=1754988680?w=400&h=400&fit=crop');
    `);
  }

  const countClients = await db.getFirstAsync('SELECT COUNT(*) as total FROM Client');
  if (countClients.total === 0) {
    await db.execAsync(`
      INSERT INTO Client (nom, mdp, admin, adresse, langue) VALUES
        ('Admin', 'admin123', 1, '123 Rue des Nains, Montreal', 'fr'),
        ('Damien', '1234', 0, '150 Rue Duquet, Sainte-Therese', 'fr'),
        ('Client', 'pass', 0, '13 Rue des Spirées, Blainville', 'fr');
    `);
  }
}
