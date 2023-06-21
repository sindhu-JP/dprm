const SSO_STC_UAT_CONFIG = {
  oauthUri: 'https://ssouat.stc.com.kw/',
  oauthClientId: 'uVWnm0aquJzvyfveAbbahL0NNPwa',
  oauthClientSecret: 'TYfLrr07FX1R0ECqYfzI4MKfDBQa',
  oauthServiceProviderName: 'DPRM_WEBUI_LOCAL'
};

const SSO_MTNGH_UAT_CONFIG = {
  oauthUri: 'https://ssouat.mtn.com.gh',
  oauthClientId: 'K2FEDsk5Q0339FM2iA6aUA7L6woa',
  oauthClientSecret: 'fi8o1iHfNPGr_CgTGimf_LUlsqAa',
  oauthServiceProviderName: 'dclm-local'
};
const SSO_DEFAULT_CONFIG = {
  oauthUri: 'https://sso2.tecnotree.com/',
  oauthClientId: 'XOoyMqkDkcA1FeFfPjlcptlNifca',
  oauthClientSecret: 'uBljhflBrTVQzO1Z3VK9cfkqTfIa',
  oauthServiceProviderName: 'DPRM_WEBUI_LOCAL'
};
window.DPRM_CONFIG = {
  basePath: '/digital-prm-web-ui/',
  sso: {
    ...SSO_DEFAULT_CONFIG,
    oauthPathUri: 'oauth2/authorize',
    oauthResponseType: 'code',
    oauthRedirectUri: 'http://localhost:3000/digital-prm-web-ui/auth',
    opco: 'mtng' // tecnotree or mtng or mtni or mtnu
  },
  appTheme: 'mtn', //mtn //stc zbahrain //tecnotree //moments
  dev: {
    server: {
      // dclm_base_url: "http://dclmuat.stc.com.kw",
      // dlpm_base_url: "http://dclmuat.stc.com.kw",
      dclm_base_url: 'http://dclm-mmp.cluster1.devtestlab2.tecnotree.com',
      dlpm_base_url: 'http://dclm-mmp.cluster1.devtestlab2.tecnotree.com',
      MOBILE_LENGTH: 20,
      SMART_SERVICE_PARTNER_TYPE: 'BOT',
      MOBILE_MIN_LENGTH: 8,
      isPermission: 'mtn',
      AgentPath: '/dprm-agent-web-ui/',
      ISSUE_PLACE: 'GHANA',
      ISSUED_BY: 'GOVERNMENT AUTHORITY'
    }
  }
};
