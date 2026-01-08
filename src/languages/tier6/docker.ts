/**
 * Docker Compose YAML language definition
 */
import { defineLang } from '../define-lang.js';

export const docker = defineLang({
  name: 'docker',
  aliases: ['docker-compose', 'compose'],
  extensions: ['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'],
  keywords: [
    // Top-level keys
    'version', 'services', 'networks', 'volumes', 'secrets', 'configs', 'name',
    // Service configuration
    'image', 'build', 'context', 'dockerfile', 'args', 'cache_from', 'labels', 'shm_size',
    'target', 'command', 'entrypoint', 'container_name', 'hostname', 'domainname',
    'user', 'working_dir', 'expose', 'ports', 'environment', 'env_file',
    'volumes', 'volume_driver', 'volumes_from', 'networks', 'network_mode',
    'depends_on', 'condition', 'links', 'external_links',
    'restart', 'deploy', 'mode', 'replicas', 'placement', 'constraints', 'preferences',
    'resources', 'limits', 'reservations', 'cpus', 'memory', 'pids',
    'update_config', 'parallelism', 'delay', 'failure_action', 'monitor', 'max_failure_ratio', 'order',
    'rollback_config', 'endpoint_mode', 'healthcheck', 'test', 'interval', 'timeout', 'retries', 'start_period',
    'logging', 'driver', 'options', 'dns', 'dns_search', 'extra_hosts', 'cap_add', 'cap_drop',
    'devices', 'security_opt', 'ulimits', 'sysctls', 'userns_mode', 'privileged', 'read_only',
    'stdin_open', 'tty', 'pid', 'ipc', 'stop_signal', 'stop_grace_period', 'init',
    'isolation', 'runtime', 'scale', 'extends', 'file', 'service',
    // Network configuration
    'driver', 'driver_opts', 'attachable', 'enable_ipv6', 'ipam', 'config', 'subnet', 'gateway',
    'internal', 'external',
    // Volume configuration
    'driver', 'driver_opts', 'external', 'labels', 'name',
  ],
  constants: [
    'true', 'false', 'yes', 'no', 'True', 'False', 'Yes', 'No',
    'null', 'Null', 'NULL', '~',
    'always', 'unless-stopped', 'on-failure', 'no', 'none',
    'bridge', 'host', 'overlay', 'macvlan', 'ipvlan',
    'replicated', 'global',
    'start-first', 'stop-first',
    'pause', 'continue', 'rollback',
    'vip', 'dnsrr',
  ],
  patterns: [
    // Variable interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // YAML keys
    { pattern: /^[\s-]*[a-zA-Z_][a-zA-Z0-9_-]*(?=:)/gm, type: 'property' },
    // YAML anchors and aliases
    { pattern: /[&*][a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Port mappings
    { pattern: /\b\d+:\d+(?:\/(?:tcp|udp))?\b/g, type: 'number' },
    // Memory/CPU values
    { pattern: /\b\d+(?:\.\d+)?[kmgKMG]?[bB]?\b/g, type: 'number' },
    // Time values
    { pattern: /\b\d+(?:ms|s|m|h)\b/g, type: 'number' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[|>-]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default docker;
