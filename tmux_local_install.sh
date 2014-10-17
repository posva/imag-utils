#!/bin/bash

# Script for installing tmux on systems where you don't have root access.
# tmux will be installed in $HOME/local/bin.
# It's assumed that wget and a C/C++ compiler are installed.

# exit on error
set -e

TMUX_VERSION=1.9

# create our directories
mkdir -p $HOME/local $HOME/tmux_tmp
cd $HOME/tmux_tmp

# download source files for tmux, libevent, and ncurses
TMUX_FILE="tmux.tar.gz"
LEVENT_FILE="levent.tar.gz"
NCURSES_FILE="ncurses.tar.gz"
if [[ ! -f "$TMUX_FILE" ]]; then
  wget -O "$TMUX_FILE" http://sourceforge.net/projects/tmux/files/tmux/tmux-${TMUX_VERSION}/tmux-${TMUX_VERSION}.tar.gz/download
else
  echo "Already Downloaded"
fi
if [[ ! -f "$LEVENT_FILE" ]]; then
  wget -O "$LEVENT_FILE" https://github.com/libevent/libevent/archive/release-2.0.21-stable.tar.gz
else
  echo "Already Downloaded"
fi
if [[ ! -f "$NCURSES_FILE" ]]; then
  wget -O "$NCURSES_FILE" ftp://ftp.gnu.org/gnu/ncurses/ncurses-5.9.tar.gz
else
  echo "Already Downloaded"
fi

# extract files, configure, and compile

############
# libevent #
############
LEVENT_DIR="libevent-release-2.0.21-stable"
if [[ ! -d "$LEVENT_DIR" ]]; then
  tar xvzf "$LEVENT_FILE"
fi
cd "$LEVENT_DIR"
./autogen.sh
./configure --prefix=$HOME/local --disable-shared
make
make install
cd ..

############
# ncurses  #
############
NCURSES_DIR="ncurses-5.9"
if [[ ! -d "$NCURSES_DIR" ]]; then
  tar xvzf "$NCURSES_FILE"
fi
cd "$NCURSES_DIR"
./configure --prefix=$HOME/local
make
make install
cd ..

############
# tmux     #
############
TMUX_DIR="tmux-${TMUX_VERSION}"
if [[ ! -d "$TMUX_DIR" ]]; then
  tar xvzf "$TMUX_FILE"
fi
cd "$TMUX_DIR"
./configure CFLAGS="-I$HOME/local/include -I$HOME/local/include/ncurses" LDFLAGS="-L$HOME/local/lib -L$HOME/local/include/ncurses -L$HOME/local/include"
CPPFLAGS="-I$HOME/local/include -I$HOME/local/include/ncurses" LDFLAGS="-static -L$HOME/local/include -L$HOME/local/include/ncurses -L$HOME/local/lib" make
cp tmux $HOME/local/bin
cd ..

# cleanup
rm -rf $HOME/tmux_tmp

echo "$HOME/local/bin/tmux is now available. You can optionally add $HOME/local/bin to your PATH."
