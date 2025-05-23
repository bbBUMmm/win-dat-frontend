import {environment} from '../../../environments/environment';
import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keyCloakUrl + '/realms/WinDat',
  redirectUri: environment.appUrl + '/',
  clientId: 'fsa-client',
  scope: 'openid',
  showDebugInformation: true,
  requireHttps: false,
};
