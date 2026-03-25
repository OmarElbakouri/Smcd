import paramiko
import sys
import time

HOST = '76.13.52.106'
USER = 'root'
PASS = 'Smcdsmcd@2026'

def ssh_exec(command, timeout=120):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, port=22, username=USER, password=PASS, timeout=15)
    stdin, stdout, stderr = client.exec_command(command, timeout=timeout)
    out = stdout.read().decode()
    err = stderr.read().decode()
    exit_code = stdout.channel.recv_exit_status()
    client.close()
    return out, err, exit_code

if __name__ == '__main__':
    cmd = ' '.join(sys.argv[1:])
    if not cmd:
        print("Usage: python deploy_ssh.py <command>")
        sys.exit(1)
    out, err, code = ssh_exec(cmd)
    if out:
        print(out)
    if err:
        print("STDERR:", err)
    print(f"EXIT CODE: {code}")
