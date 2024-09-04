# docker 基础

## 安装

### 添加 docker 仓库

使用包管理工具来安装 docker,需要先给包管理器添加 docker 仓库  
仓库地址在 `/etc/yum.repos.d`  
可以使用 `dnf-plugins-core` 来添加仓库，也可以直接将仓库文件添加到 `/etc/yum.repos.d` 中

```shell
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

完成后在 `/etc/yum.repos.d` 下会有一个 `docker-ce.repo` 文件  
或将 `docker-ce.repo` 文件下载后移动到 `/etc/yum.repos.d` 下
:::tip

docker 的仓库默认是从 docker 官方地址来安装应用，如果无法安装可以更换安装地址  
清华软件仓库：https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/
:::
安装完成后可以使用 `dnf repolist` 来查看仓库是否添加完成

### 安装 docker

```shell
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### docker 的启动

```shell
# 运行 docker   安装 docker 后需执行
systemctl start docker
# 停止 docker
systemctl stop docker
# 查看 docker 状态
systemctl status docker
# 重启 docker
systemctl restart docker
# docker 开机自启
systemctl enable docker
```

### docker 换源

docker 安装完成后可以从云端下载各种镜像，由于墙的原因，可以更换镜像源来加速下载  
docker 的镜像源配置文件在 `/etc/docker/daemon.json` **如果不存在则手动创建**

```shell title="/etc/docker/daemon.json"
# 如果没有 daemon.json 文件则手动创建
{"registry-mirrors": ["https://dockerpull.com"]}
```

配置镜像源后 重启 docker `systemctl restart docker`

## 帮助命令

```shell
# 查看版本
docker version

# 查看 docker 系统信息
docker info
```

## 镜像操作

镜像下载

```shell
docker pull image[:tag]
```

镜像查看

```shell
    # 查看docker本地的镜像
    docker images [options]
        可选项
            -a --all    列出全部镜像
            -q --quiet  只显示镜像ID
```

镜像查看输出结果

```
    REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
    hello-world   latest    d1165f221234   6 months ago   13.3kB

    REPOSITORY：镜像的仓库源
    TAG ：      镜像的标签
    IMAGE ID：  镜像的ID
    CREATED：   镜像的创建时间
    SIZE：      镜像的大小
```

镜像删除

```shell
# 可以根据镜像名称或者镜像的id来删除
docker rmi [options] image
    options
        -f --force 强制删除
```

## 容器操作

创建运行容器

```shell
docker run [options] image[:tag]
    options
        --name              容器名称
        -d                  后台运行容器
        -p port:port        端口映射
        -e key=value        环境变量
        --restart:[option]  重启策略
            no                  默认：退出不重启
            on-failure[:num]    非正常退出重启,可后缀选择重启次数
            always              总是重启
        --name container_name   容器名称

```

容器删除

```shell
# 删除容器前需要先停止对应容器
docker stop container_name
# 可以根据镜像名称或者镜像的id来删除
docker rm container_name
```

修改名称

```shell
# 修改容器名称
docker rename old_container_name new_container_name
```

文件交换

```shell
# 宿主机与容器内部的文件交换
# 容器到宿主机
docker cp container_name:path host_path
# 宿主机到容器
docker cp host_path container_name:path

```
