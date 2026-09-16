import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        booking: resolve(__dirname, 'booking.html'),
        menu: resolve(__dirname, 'menu.html'),
        corporate: resolve(__dirname, 'corporate.html'),
        membership: resolve(__dirname, 'membership.html'),
        party: resolve(__dirname, 'party.html')
      }
    }
  }
});
