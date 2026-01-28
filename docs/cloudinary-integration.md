# Guide d'Intégration CDN - Cloudinary

Ce guide vous montre comment intégrer Cloudinary pour optimiser automatiquement vos images.

## 🎯 Pourquoi Cloudinary ?

- ✅ **Gratuit** jusqu'à 25GB et 25k transformations/mois
- ✅ **Conversion WebP automatique** selon le navigateur
- ✅ **Redimensionnement à la volée** (pas besoin de créer plusieurs versions)
- ✅ **CDN global** (chargement ultra-rapide partout dans le monde)
- ✅ **Optimisation automatique** de la qualité

---

## 📦 Installation

### Étape 1: Créer un compte Cloudinary

1. Allez sur https://cloudinary.com/users/register/free
2. Créez un compte gratuit
3. Notez votre **Cloud Name** (visible dans le dashboard)

### Étape 2: Uploader vos images

**Option A: Via l'interface web**
1. Allez dans "Media Library"
2. Uploadez vos images depuis `/public/assets`
3. Organisez-les dans des dossiers

**Option B: Via l'API (recommandé pour bulk upload)**
```bash
npm install cloudinary
```

```javascript
// scripts/upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const path = require('path');

cloudinary.config({
  cloud_name: 'VOTRE_CLOUD_NAME',
  api_key: 'VOTRE_API_KEY',
  api_secret: 'VOTRE_API_SECRET'
});

async function uploadFolder(folderPath) {
  const files = await fs.readdir(folderPath);
  
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'lolly-agency',
          public_id: path.basename(file, path.extname(file))
        });
        console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
      } catch (error) {
        console.error(`❌ Failed: ${file}`, error.message);
      }
    }
  }
}

uploadFolder('./public/assets');
```

---

## 🔧 Intégration dans le Code

### Créer un Helper

```typescript
// src/utils/cloudinary.ts
const CLOUD_NAME = 'votre-cloud-name'; // Remplacez par votre Cloud Name

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
}

/**
 * Génère une URL Cloudinary optimisée
 * 
 * @param publicId - ID public de l'image (ex: "notre-odyssee")
 * @param options - Options de transformation
 * @returns URL optimisée
 * 
 * @example
 * cloudinaryUrl('notre-odyssee', { width: 800, quality: 'auto' })
 * // → https://res.cloudinary.com/.../w_800,f_auto,q_auto/notre-odyssee
 */
export function cloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;

  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  const transformations = [
    width && `w_${width}`,
    height && `h_${height}`,
    crop && `c_${crop}`,
    `f_${format}`,
    `q_${quality}`
  ].filter(Boolean).join(',');

  return `${baseUrl}/${transformations}/${publicId}`;
}

/**
 * Génère un srcset responsive pour Cloudinary
 */
export function cloudinarySrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200]
): string {
  return widths
    .map(w => `${cloudinaryUrl(publicId, { width: w })} ${w}w`)
    .join(', ');
}
```

### Utilisation dans les Composants

#### Exemple 1: Image Simple
```tsx
// Avant
<img src="/assets/notre-odyssee.png" alt="..." />

// Après
import { cloudinaryUrl } from '@/utils/cloudinary';

<img 
  src={cloudinaryUrl('notre-odyssee', { width: 800 })} 
  alt="..."
  loading="lazy"
/>
```

#### Exemple 2: Image Responsive
```tsx
import { cloudinaryUrl, cloudinarySrcSet } from '@/utils/cloudinary';

<img
  src={cloudinaryUrl('notre-odyssee', { width: 800 })}
  srcSet={cloudinarySrcSet('notre-odyssee')}
  sizes="(max-width: 768px) 100vw, 800px"
  alt="Notre Odyssée"
  loading="lazy"
/>
```

#### Exemple 3: Avec OptimizedImage
```tsx
// Étendre le composant OptimizedImage
import { cloudinaryUrl } from '@/utils/cloudinary';

<OptimizedImage
  src={cloudinaryUrl('amadou-mbaye-gueye', { width: 800 })}
  alt="Amadou Mbaye GUEYE"
  width={800}
  height={800}
/>
```

---

## 🎨 Transformations Avancées

### Recadrage Intelligent
```typescript
// Détection de visage automatique
cloudinaryUrl('portrait', { 
  width: 400, 
  height: 400, 
  crop: 'thumb',
  gravity: 'face' 
})
```

### Effets Artistiques
```typescript
// Ajouter un effet grayscale
cloudinaryUrl('image', { 
  width: 800,
  effect: 'grayscale'
})

// Blur background
cloudinaryUrl('image', {
  width: 800,
  effect: 'blur_region:1000',
  gravity: 'face'
})
```

### Optimisation Agressive
```typescript
// Qualité automatique + compression maximale
cloudinaryUrl('image', {
  width: 800,
  quality: 'auto:eco', // Compression agressive
  fetch_format: 'auto' // WebP si supporté
})
```

---

## 📊 Monitoring et Analytics

Cloudinary fournit un dashboard avec :
- 📈 Nombre de transformations utilisées
- 💾 Bande passante consommée
- 🖼️ Images les plus demandées
- ⚡ Performance du CDN

---

## 🚀 Migration Progressive

### Étape 1: Tester sur une page
Commencez par migrer une seule page (ex: About.tsx)

### Étape 2: Comparer les performances
Utilisez Lighthouse pour mesurer l'impact

### Étape 3: Migrer progressivement
Une fois validé, migrez les autres pages

### Étape 4: Nettoyer
Une fois tout migré, vous pouvez supprimer les images de `/public/assets` (gardez une backup !)

---

## 💡 Bonnes Pratiques

1. **Utilisez `f_auto`** : Laissez Cloudinary choisir le meilleur format
2. **Utilisez `q_auto`** : Optimisation automatique de la qualité
3. **Spécifiez toujours width/height** : Évite le layout shift
4. **Utilisez le lazy loading** : Même avec Cloudinary
5. **Organisez vos images** : Utilisez des dossiers dans Cloudinary

---

## 🔐 Sécurité

**Variables d'environnement** :
```bash
# .env.local
VITE_CLOUDINARY_CLOUD_NAME=votre-cloud-name
```

```typescript
// src/utils/cloudinary.ts
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
```

**Ne commitez JAMAIS** vos API keys dans Git !

---

## 📈 Résultats Attendus

Avec Cloudinary :
- ⚡ **Temps de chargement** : -50% à -70%
- 📦 **Taille des images** : -30% à -50%
- 🌍 **Disponibilité globale** : 99.9%
- 🔄 **Cache automatique** : Oui

---

## 🆘 Support

- Documentation : https://cloudinary.com/documentation
- Community : https://community.cloudinary.com/
- Support : support@cloudinary.com

---

## ✅ Checklist de Migration

- [ ] Créer un compte Cloudinary
- [ ] Uploader les images
- [ ] Créer le helper `cloudinary.ts`
- [ ] Tester sur une page
- [ ] Mesurer les performances (Lighthouse)
- [ ] Migrer progressivement
- [ ] Monitorer l'utilisation
- [ ] Optimiser selon les analytics

**Temps estimé** : 2-3 heures pour une migration complète
