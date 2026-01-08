/**
 * Ansible YAML playbook language definition
 */
import { defineLang } from '../define-lang.js';

export const ansible = defineLang({
  name: 'ansible',
  aliases: ['ansible-playbook', 'ansible-yaml'],
  extensions: ['.yml', '.yaml'],
  keywords: [
    // Playbook keywords
    'hosts', 'tasks', 'handlers', 'roles', 'vars', 'vars_files', 'vars_prompt',
    'pre_tasks', 'post_tasks', 'gather_facts', 'become', 'become_user', 'become_method',
    'remote_user', 'connection', 'environment', 'strategy', 'serial', 'max_fail_percentage',
    'any_errors_fatal', 'ignore_errors', 'ignore_unreachable', 'module_defaults',
    'collections', 'name', 'when', 'loop', 'loop_control', 'with_items', 'with_dict',
    'with_fileglob', 'with_first_found', 'with_inventory_hostnames', 'with_lines',
    'with_nested', 'with_random_choice', 'with_sequence', 'with_subelements',
    'with_together', 'register', 'until', 'retries', 'delay', 'changed_when',
    'failed_when', 'notify', 'listen', 'block', 'rescue', 'always', 'tags',
    'delegate_to', 'delegate_facts', 'run_once', 'local_action', 'async', 'poll',
    'throttle', 'check_mode', 'diff', 'no_log',
  ],
  constants: [
    'true', 'false', 'yes', 'no', 'True', 'False', 'Yes', 'No',
    'null', 'Null', 'NULL', '~',
  ],
  builtins: [
    // Common modules
    'apt', 'yum', 'dnf', 'pacman', 'pip', 'gem', 'npm',
    'copy', 'template', 'file', 'lineinfile', 'blockinfile', 'replace', 'fetch',
    'command', 'shell', 'script', 'raw', 'expect',
    'service', 'systemd', 'sysvinit',
    'user', 'group', 'authorized_key',
    'git', 'subversion', 'hg',
    'docker_container', 'docker_image', 'docker_network', 'docker_volume',
    'k8s', 'k8s_info', 'helm',
    'ec2', 'ec2_instance', 'ec2_vpc', 's3_bucket', 'aws_s3', 'route53',
    'azure_rm', 'gcp_compute',
    'debug', 'assert', 'fail', 'pause', 'wait_for', 'wait_for_connection',
    'set_fact', 'set_stats', 'include', 'include_tasks', 'include_role', 'include_vars',
    'import_tasks', 'import_role', 'import_playbook',
    'meta', 'add_host', 'group_by',
    'uri', 'get_url', 'unarchive', 'archive',
    'cron', 'at',
    'mysql_db', 'mysql_user', 'postgresql_db', 'postgresql_user',
    'firewalld', 'ufw', 'iptables',
    'mount', 'parted', 'lvol', 'filesystem',
  ],
  patterns: [
    // Jinja2 variables
    { pattern: /\{\{[\s\S]*?\}\}/g, type: 'interpolation' },
    // Jinja2 statements
    { pattern: /\{%[\s\S]*?%\}/g, type: 'meta' },
    // Jinja2 comments
    { pattern: /\{#[\s\S]*?#\}/g, type: 'comment' },
    // YAML keys
    { pattern: /^[\s-]*[a-zA-Z_][a-zA-Z0-9_]*(?=:)/gm, type: 'property' },
    // YAML anchors and aliases
    { pattern: /[&*][a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // YAML tags
    { pattern: /![a-zA-Z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[|>+-]/g, type: 'operator' },
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

export default ansible;
