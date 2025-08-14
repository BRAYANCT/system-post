/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com','github.com'], // Asegúrate de incluir todos los dominios que uses para imágenes
     // 👈 agrega este dominio
  },
};

export default nextConfig;
