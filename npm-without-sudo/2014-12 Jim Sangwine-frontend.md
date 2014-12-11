# How to run npm without sudo

## The problem

A lot of people (myself included) have run into permissions errors installing packages globally via npm.

The common reaction (I did it!) is to simply `sudo npm install ***` which works, but will only cause more problems down the line!

I have read a lot of discussions online, and it seems that this is usually caused by installing node using sudo (often required when using package managers), or by using sudo to install the first package. 
This causes the ~/.npm cache folder with root permissions which means that all subsequent installs also require root permissions.

Some people suggest re-installing node from source to get round this, but this still requires some further configuration so I prefer to install via my package manager of choice and just reconfigure npm to work without sudo.
This solution works fine for people who already have node &amp; npm installed - you just need to reinstall your global packages at the end.

I have tested this in OS X (Yosemite), Ubuntu 14.04 and a number of older versions of Linux Mint.

<a name="first-step"></a>
## What are you going to need to reinstall?

Before you begin, I suggest you get a list of your globally installed packages so you know what to reinstall later:

<pre lang="bash">
npm list -g --depth=0
</pre>

_Sample output:_
<pre lang="bash">
/usr/lib
├── bower@1.3.12
├── grunt-cli@0.1.13
├── gulp@3.8.10
├── npm@1.4.28
└── yo@1.3.3
</pre>

## Tell npm to install packages to home

By default, npm installs packages under `/usr/lib/node_modules` or `/usr/local/lib/node_modules` depending on your OS / distribution. 
If you're curious, you can check like this:

<pre lang="bash">
npm config get prefix
</pre>

Your install path is the output of the above command plus `/node_modules`.
So if the command outputs `/usr/lib` then your install path is `/usr/lib/node_modules`.

The first step is to get it to install to your home directory instead.

<pre lang="bash">
npm config set prefix ~/npm
</pre>

## Fix your paths

Next, you need to add the appropriate paths to your environment variables...

<pre lang="bash">
# open your .bashrc (Linux) or .bash_profile (Mac) file for editing:
nano ~/.bashrc # for Linux
# or...
nano ~/.bash_profile # for Mac if you haven't created a .bashrc file

# add these lines:
export PATH="$PATH:$HOME/npm/bin"
export NODE_PATH="$NODE_PATH:$HOME/npm/lib/node_modules"

# save the file and then enter this command to make the changes take effect:
. ~/.bashrc
# or...
. ~/.bash_profile
</pre>

## Take ownership

Now you need to take ownership of everything that has previously been installed in ~/.npm. 
Anything that was previously installed using `sudo npm install` will be owned by `root` and will cause problems later.

<pre lang="bash">
# optionally check to see if anything is owned by root:
ls -la ~/.npm

# take ownership of everything in your ~/.npm directory (must be run with sudo):
sudo chown -R $USER:`id -g -n $USER` ~/.npm
</pre>

## Reinstall your global packages

Finally, reinstall all your global packages (the ones you checked for in the <a href="#first-step">first step</a>)... this time without sudo!

<pre lang="bash">
# no sudo necessary :)
npm install -g bower
npm install -g grunt-cli
npm install -g gulp
npm install -g yo
</pre>

And that's it - hopefully this helps someone.

If I missed anything, or if there is a better way, please let me know in the comments.