import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.triagem.guiadebolso',
  appName: 'Triagem Guia de Bolso',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
