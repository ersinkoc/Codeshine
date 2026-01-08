/**
 * Apache configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const apache = defineLang({
  name: 'apache',
  aliases: ['apacheconf', 'htaccess'],
  extensions: ['.htaccess', '.conf', 'httpd.conf', 'apache2.conf'],
  keywords: [
    // Core directives
    'ServerRoot', 'Listen', 'LoadModule', 'Include', 'IncludeOptional',
    'ServerAdmin', 'ServerName', 'ServerAlias', 'DocumentRoot',
    'Directory', 'DirectoryMatch', 'Files', 'FilesMatch', 'Location', 'LocationMatch',
    'VirtualHost', 'IfModule', 'IfDefine', 'IfVersion', 'Else', 'ElseIf',
    'Options', 'AllowOverride', 'Require', 'Order', 'Allow', 'Deny',
    // Common directives
    'ErrorLog', 'CustomLog', 'LogLevel', 'LogFormat',
    'ErrorDocument', 'DirectoryIndex', 'DefaultType',
    'AddType', 'AddEncoding', 'AddHandler', 'AddOutputFilter',
    'SetHandler', 'SetEnv', 'SetEnvIf', 'SetEnvIfNoCase',
    'Alias', 'AliasMatch', 'ScriptAlias', 'ScriptAliasMatch',
    'Redirect', 'RedirectMatch', 'RedirectPermanent', 'RedirectTemp',
    'RewriteEngine', 'RewriteBase', 'RewriteCond', 'RewriteRule', 'RewriteMap',
    'ProxyPass', 'ProxyPassReverse', 'ProxyRequests', 'ProxyPreserveHost',
    'Header', 'RequestHeader', 'ExpiresActive', 'ExpiresByType', 'ExpiresDefault',
    'FileETag', 'EnableMMAP', 'EnableSendfile',
    // SSL directives
    'SSLEngine', 'SSLCertificateFile', 'SSLCertificateKeyFile', 'SSLCertificateChainFile',
    'SSLCACertificateFile', 'SSLProtocol', 'SSLCipherSuite', 'SSLHonorCipherOrder',
    'SSLVerifyClient', 'SSLVerifyDepth', 'SSLOptions', 'SSLRequireSSL',
    // Auth directives
    'AuthType', 'AuthName', 'AuthBasicProvider', 'AuthUserFile', 'AuthGroupFile',
    // MPM directives
    'StartServers', 'MinSpareServers', 'MaxSpareServers', 'MaxClients', 'MaxRequestsPerChild',
    'MinSpareThreads', 'MaxSpareThreads', 'ThreadsPerChild', 'MaxRequestWorkers',
    // Timeout directives
    'Timeout', 'KeepAlive', 'KeepAliveTimeout', 'MaxKeepAliveRequests',
    // Security
    'ServerSignature', 'ServerTokens', 'TraceEnable',
    // Compression
    'AddOutputFilterByType', 'DeflateCompressionLevel', 'DeflateBufferSize',
    // MIME
    'TypesConfig', 'MIMEMagicFile', 'AddDefaultCharset',
  ],
  constants: [
    'On', 'Off', 'None', 'All', 'Any', 'AuthConfig', 'FileInfo', 'Indexes', 'Limit',
    'ExecCGI', 'FollowSymLinks', 'Includes', 'IncludesNOEXEC', 'MultiViews', 'SymLinksIfOwnerMatch',
    'Basic', 'Digest', 'Form',
    'granted', 'denied', 'valid-user', 'user', 'group', 'env', 'ip', 'host', 'method',
    'permanent', 'temp', 'seeother', 'gone',
    'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'TRACE', 'CONNECT',
    'HTTP/1.0', 'HTTP/1.1', 'HTTP/2',
    'TLSv1', 'TLSv1.1', 'TLSv1.2', 'TLSv1.3', 'SSLv3',
  ],
  patterns: [
    // Section tags
    { pattern: /<\/?[A-Za-z][A-Za-z0-9]*(?:\s[^>]*)?>/g, type: 'tag' },
    // Variables
    { pattern: /%\{[A-Z_][A-Z0-9_:]*\}/g, type: 'variable' },
    { pattern: /\$\{[A-Za-z_][A-Za-z0-9_]*\}/g, type: 'variable' },
    { pattern: /\$\d+/g, type: 'variable' },
    // IP addresses
    { pattern: /\b\d{1,3}(?:\.\d{1,3}){3}(?:\/\d{1,2})?\b/g, type: 'number' },
    // Numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    // Flags
    { pattern: /\[[A-Z,=0-9]+\]/g, type: 'attribute' },
    // Operators
    { pattern: /[!=<>]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '<', close: '>' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default apache;
