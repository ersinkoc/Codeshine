/**
 * Nginx configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const nginx = defineLang({
  name: 'nginx',
  aliases: ['nginxconf'],
  extensions: ['.conf', 'nginx.conf'],
  keywords: [
    // Core module
    'accept_mutex', 'accept_mutex_delay', 'daemon', 'debug_connection', 'debug_points',
    'env', 'error_log', 'events', 'include', 'load_module', 'lock_file', 'master_process',
    'multi_accept', 'pcre_jit', 'pid', 'ssl_engine', 'thread_pool', 'timer_resolution',
    'use', 'user', 'worker_aio_requests', 'worker_connections', 'worker_cpu_affinity',
    'worker_priority', 'worker_processes', 'worker_rlimit_core', 'worker_rlimit_nofile',
    'worker_shutdown_timeout', 'working_directory',
    // HTTP core
    'http', 'server', 'location', 'upstream', 'map', 'geo', 'types', 'limit_except',
    'if', 'set', 'rewrite', 'return', 'break', 'internal',
    // Server directives
    'listen', 'server_name', 'root', 'alias', 'index', 'try_files', 'error_page',
    'default_type', 'types_hash_bucket_size', 'types_hash_max_size',
    'client_body_buffer_size', 'client_body_in_file_only', 'client_body_in_single_buffer',
    'client_body_temp_path', 'client_body_timeout', 'client_header_buffer_size',
    'client_header_timeout', 'client_max_body_size', 'connection_pool_size',
    'directio', 'directio_alignment', 'disable_symlinks', 'etag', 'if_modified_since',
    'ignore_invalid_headers', 'keepalive_disable', 'keepalive_requests', 'keepalive_time',
    'keepalive_timeout', 'large_client_header_buffers', 'limit_rate', 'limit_rate_after',
    'lingering_close', 'lingering_time', 'lingering_timeout', 'log_not_found',
    'log_subrequest', 'max_ranges', 'merge_slashes', 'msie_padding', 'msie_refresh',
    'open_file_cache', 'open_file_cache_errors', 'open_file_cache_min_uses',
    'open_file_cache_valid', 'output_buffers', 'port_in_redirect', 'postpone_output',
    'read_ahead', 'recursive_error_pages', 'request_pool_size', 'reset_timedout_connection',
    'resolver', 'resolver_timeout', 'satisfy', 'send_lowat', 'send_timeout', 'sendfile',
    'sendfile_max_chunk', 'server_name_in_redirect', 'server_names_hash_bucket_size',
    'server_names_hash_max_size', 'server_tokens', 'subrequest_output_buffer_size',
    'tcp_nodelay', 'tcp_nopush', 'underscores_in_headers', 'variables_hash_bucket_size',
    'variables_hash_max_size',
    // Proxy
    'proxy_pass', 'proxy_set_header', 'proxy_hide_header', 'proxy_pass_header',
    'proxy_redirect', 'proxy_buffering', 'proxy_buffers', 'proxy_buffer_size',
    'proxy_busy_buffers_size', 'proxy_cache', 'proxy_cache_bypass', 'proxy_cache_key',
    'proxy_cache_lock', 'proxy_cache_methods', 'proxy_cache_min_uses', 'proxy_cache_path',
    'proxy_cache_revalidate', 'proxy_cache_use_stale', 'proxy_cache_valid',
    'proxy_connect_timeout', 'proxy_cookie_domain', 'proxy_cookie_path',
    'proxy_headers_hash_bucket_size', 'proxy_headers_hash_max_size', 'proxy_http_version',
    'proxy_ignore_client_abort', 'proxy_ignore_headers', 'proxy_intercept_errors',
    'proxy_max_temp_file_size', 'proxy_method', 'proxy_next_upstream',
    'proxy_next_upstream_timeout', 'proxy_next_upstream_tries', 'proxy_no_cache',
    'proxy_pass_request_body', 'proxy_pass_request_headers', 'proxy_read_timeout',
    'proxy_request_buffering', 'proxy_send_lowat', 'proxy_send_timeout',
    'proxy_set_body', 'proxy_socket_keepalive', 'proxy_ssl_certificate',
    'proxy_ssl_certificate_key', 'proxy_ssl_ciphers', 'proxy_ssl_crl',
    'proxy_ssl_name', 'proxy_ssl_password_file', 'proxy_ssl_protocols',
    'proxy_ssl_server_name', 'proxy_ssl_session_reuse', 'proxy_ssl_trusted_certificate',
    'proxy_ssl_verify', 'proxy_ssl_verify_depth', 'proxy_store', 'proxy_store_access',
    'proxy_temp_file_write_size', 'proxy_temp_path',
    // FastCGI
    'fastcgi_pass', 'fastcgi_param', 'fastcgi_split_path_info', 'fastcgi_index',
    'fastcgi_buffer_size', 'fastcgi_buffers', 'fastcgi_busy_buffers_size',
    'fastcgi_cache', 'fastcgi_cache_bypass', 'fastcgi_cache_key', 'fastcgi_cache_lock',
    'fastcgi_cache_methods', 'fastcgi_cache_min_uses', 'fastcgi_cache_path',
    'fastcgi_cache_revalidate', 'fastcgi_cache_use_stale', 'fastcgi_cache_valid',
    'fastcgi_catch_stderr', 'fastcgi_connect_timeout', 'fastcgi_force_ranges',
    'fastcgi_hide_header', 'fastcgi_ignore_client_abort', 'fastcgi_ignore_headers',
    'fastcgi_intercept_errors', 'fastcgi_keep_conn', 'fastcgi_max_temp_file_size',
    'fastcgi_next_upstream', 'fastcgi_next_upstream_timeout', 'fastcgi_next_upstream_tries',
    'fastcgi_no_cache', 'fastcgi_pass_header', 'fastcgi_pass_request_body',
    'fastcgi_pass_request_headers', 'fastcgi_read_timeout', 'fastcgi_request_buffering',
    'fastcgi_send_lowat', 'fastcgi_send_timeout', 'fastcgi_socket_keepalive',
    'fastcgi_store', 'fastcgi_store_access', 'fastcgi_temp_file_write_size', 'fastcgi_temp_path',
    // SSL
    'ssl', 'ssl_buffer_size', 'ssl_certificate', 'ssl_certificate_key', 'ssl_ciphers',
    'ssl_client_certificate', 'ssl_conf_command', 'ssl_crl', 'ssl_dhparam',
    'ssl_early_data', 'ssl_ecdh_curve', 'ssl_ocsp', 'ssl_ocsp_cache', 'ssl_ocsp_responder',
    'ssl_password_file', 'ssl_prefer_server_ciphers', 'ssl_protocols', 'ssl_reject_handshake',
    'ssl_session_cache', 'ssl_session_ticket_key', 'ssl_session_tickets', 'ssl_session_timeout',
    'ssl_stapling', 'ssl_stapling_file', 'ssl_stapling_responder', 'ssl_stapling_verify',
    'ssl_trusted_certificate', 'ssl_verify_client', 'ssl_verify_depth',
    // Gzip
    'gzip', 'gzip_buffers', 'gzip_comp_level', 'gzip_disable', 'gzip_http_version',
    'gzip_min_length', 'gzip_proxied', 'gzip_static', 'gzip_types', 'gzip_vary',
    // Log
    'access_log', 'log_format', 'open_log_file_cache',
    // Headers
    'add_header', 'add_trailer', 'expires',
    // Auth
    'auth_basic', 'auth_basic_user_file', 'auth_request', 'auth_request_set',
    // Limit
    'limit_conn', 'limit_conn_dry_run', 'limit_conn_log_level', 'limit_conn_status',
    'limit_conn_zone', 'limit_req', 'limit_req_dry_run', 'limit_req_log_level',
    'limit_req_status', 'limit_req_zone',
  ],
  constants: [
    'on', 'off', 'yes', 'no', 'true', 'false',
    'any', 'all', 'deny', 'allow',
    'default', 'backup', 'down', 'weight',
    'kqueue', 'epoll', 'rtsig', 'poll', 'select', '/dev/poll',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Location modifiers
    { pattern: /[~*^]=?/g, type: 'operator' },
    // Numbers with units
    { pattern: /\b\d+(?:\.\d+)?(?:ms?|s|m|h|d|w|M|y|k|K|m|M|g|G)?\b/g, type: 'number' },
    // IP addresses
    { pattern: /\b\d{1,3}(?:\.\d{1,3}){3}(?:\/\d{1,2})?\b/g, type: 'number' },
    // Ports
    { pattern: /:\d+/g, type: 'number' },
    // Operators
    { pattern: /[=!~]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '(', close: ')' },
  ],
});

export default nginx;
