---
title: 自定义WSL内核及内核模块
date: 2026-04-14 20:22:23
tags: WSL Linux kernel
---
## 引言
WSL(Windows Subsystem for Linux)，是微软公司开发的一款基于Hyper-V的轻量级虚拟机，支持完整的Linux内核。
微软官方维护的WSL内核在GitHub上公开发布（[microsoft/WSL2-Linux-Kernel](https://github.com/microsoft/WSL2-Linux-Kernel)）。
<!--more-->
## 自定义kernel

### 克隆（clone）`microsoft/WSL2-Linux-Kernel`仓库
终端中输入以下命令并单击回车：
```bash
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git
```
克隆完成后，进入仓库主文件夹：
```bash
cd WSL-Linux-Kernel
```
### 编译教程
在Ubuntu发行版中，借助以下命令完成`x86_64`WSL内核的编译[^1]：
1. 终端输入以下命令并回车，安装编译内核所需工具：
```bash
sudo apt install build-essential flex bison dwarves libssl-dev libelf-dev cpio qemu-utils libncurses-dev
```
2. 通过终端图形界面配置内核:
```bash
make menuconfig KCONFIG_CONFIG=Microsoft/config-wsl
```
3. 使用WSL2内核配置构建linux kernel，编译内核模块并将内核模块放在工作目录下的`modules`目录中:
```bash
make KCONFIG_CONFIG=Microsoft/config-wsl && make INSTALL_MOD_PATH="$PWD/modules" modules_install
```
可以在第一个`make`命令后传入`-j$(nproc)`参数来加速编译。

之后，你可以用仓库内提供的脚本生成模块虚拟磁盘VHDX:
```bash
sudo ./Microsoft/scripts/gen_modules_vhdx.sh "$PWD/modules" $(make -s kernelrelease) modules.vhdx
```

可以删除编译产物来节省存储空间：
```bash
make clean && rm -r "$PWD/modules"
```

## 故障排除

> ⚠️ **注意：** 
  编译自定义内核并使用配套内核的关键是在Windows&reg;环境下将`modules.vhdx`的访问权限设置为`Everyone`只读权限。

就是说，需要在Windows&reg;下对`modules.vhdx`执行如下命令[^2]：
```cmd
icacls.exe "./modules.vhd" "/grant:r" "Everyone:(R)"
```
[^1]: [WSL2-Linux-Kernel/readme](https://github.com/microsoft/WSL2-Linux-Kernel?tab=readme-ov-file#build-instructions)
[^2]: [WSL/UserConfig.cmake.sample](https://github.com/microsoft/WSL/blob/master/UserConfig.cmake.sample)