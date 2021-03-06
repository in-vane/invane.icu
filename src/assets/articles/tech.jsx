export const welcome = `Hi, I'm in_vane, welcome to my blog.
Try to find more information about me.
Type 'help' to get help.

`;

export const profile = `
你好呀，
很高兴见到你，
欢迎来到我的小旮旯～
这里是in_vane。
- 能打两行代码，React、RN、TypeScript，会点Docker和Nginx，搭过Egg.js
- 大学时候手里捏的是听风吹雪，现在A好久了
- 半二次
- 好听的曲儿都听，影视作品也一样
- 一天的能量用完就会不说话，睡觉充电
- 动次打次
- 搬家的时候书很麻烦
- 在补算法

`;

export const docker = `
# Docker Image 的制作与部署
以前部署前端项目的时候，都是 build 完把 dist 丢到服务器上，然后 Nginx 指一下位置就完了。
本篇是使用 Docker 部署的过程记录，如下：

## 编写 Dockerfile
> 摘自 wiki：Docker 可以依照 Dockerfile 的内容，自动化地构建镜像。Dockerfile 是包含着用户想要如何构建镜像的所有命令的文本。
这是我的目录：
.
├── Dockerfile

├── conf.d
│   └── default.conf
└── dist

这是我的 Dockerfile:
========================================
$ FROM nginx:latest  // 基于最新的 Nginx 镜像制作目标镜像
$ COPY ./dist /usr/share/nginx/html/  // 把 dist 复制到指定路径
$ COPY ./conf.d/ /etc/nginx/conf.d/  // 把 Nginx 配置复制到指定路径
$ EXPOSE 80  // 对外暴露 80 端口
========================================

也许你在网络上见过其他作者写的示例，里面有
========================================
$ FROM node...
$ RUN npm install...
$ RUN npm run build...
========================================
等等。
这样的做法相当于是在镜像里安装 node_modules 然后执行 build，我这儿是直接把 build 好的装进去而已，
随你的 CIDI 或者开发流程啥的自己选择啦，你懂我意思吧？

## 构建Image镜像
$ docker build -t [name]:[tag] .
注意最后那个点，那是指定要使用的 Dockerfile 的路径，如果构建成功，运行
$ docker images
就可以看到你的镜像啦。因为只装进去了 dist，所以 size 也蛮小。

## 运行容器
$ docker run -d -p 80:80 --name [ur name] [image name]:[tag]
如果运行成功，那么执行
$ docker ps -a
就可以看到你的容器啦～

## docker-compose
这个工具可以用于定义和运行多容器 Docker 应用程序。
比如你有一组服务要起，甚至各服务之间还有依赖关系，那么就用它好啦。

## 你要是好奇容器里面长啥样
$ docker exec -it [container ID] bash
这条命令会分配一个目标容器的伪终端，看起来就像你“进入”了这个容器，然后你就可以在里面到处看啦～

完。

`;
