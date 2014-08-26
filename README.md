<<<<<<< HEAD
This is a Vagrant file and set of Chef recipes for building a basic node development environment.
If you're not familiar with Vagrant, read more about it at http://www.vagrantup.com.

To get this to work, you must have VirtualBox (> 4.1.0) and Vagrant (> 1.0) installed. 
I've most recently been testing it with VirtualBox 4.2.10 and Vagrant 1.1.0. Please post an
issue if you're having problems with other versions, and I'll see if I can track it down.


Installers for VirtualBox are available at http://www.virtualbox.org, and installers for
Vagrant are available at http://www.vagrantup.com.

Once you have the pre-requisites installed, you should be able to clone this repository 

    git clone https://github.com/semmypurewal/node-dev-bootstrap.git my_project

and change to your new project directory to start your VM:

    cd my_project
    vagrant up

Note that the Vagrantfile will download and install the precise32 vagrant box if you don't
already have it.

After a few minutes, you should have a virtual dev environment with node, npm, mongodb and redis.
The app folder is shared, and port 3000 on the VM is forwarded to port 3000 on the localhost. This
is all customizable in the Vagrantfile.

You can test out your environment by ssh'ing into your environment and running the sample script:

    vagrant ssh
    cd app
    node server.js

Next open localhost:3000 in your web browser. If everything worked correctly, you should see
'Hello World'

## Important note about Installing NPM Packages

Later versions of VirtualBox do not support symlinks in shared folders. More info is available
here: https://www.virtualbox.org/ticket/10085

This can cause problems when you're attempting to install certain packages via npm. For
example, the 'jade' and 'express' packages create symlinks during installation, and
therefore the installation will fail in the shared 'app' directory.

The best workaround for this is to install node packages in your shared folder with the 
--no-bin-links flag, e.g.

    npm install express --no-bin-links

If VirtualBox is your provider and you're using MacOS, you may also want to try to uncomment
the "setextradata" customization in the VagrantFile to allow symlinks to work.

I'm not sure how this affects other Virtual Machine providers.





=======
# Brunch app

This is HTML5 application, built with [Brunch](http://brunch.io).

## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Chaplin site](http://chaplinjs.org)
>>>>>>> 53fbcf1615a5be4053fdc4aa44a249c25c6deab8
