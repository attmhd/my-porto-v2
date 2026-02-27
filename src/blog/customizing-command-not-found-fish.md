---
title: "Customizing the 'Unknown Command' Message in Fish Shell"
date: "2026-02-27"
slug: "customizing-command-not-found-fish"
description: "Customizing the 'Unknown Command' Message in Fish Shell"
tags: ["fish", "shell"]
---
Hello everyone! We’ve all been there typos in the terminal. 
Instead of a boring "command not found" error, why not make it more interactive? 
Today, I’ll show you how to customize that message and even add a "FAAAAHHH" sound effect for a bit of fun.

Here is how you do it:

### 1. Locate the Configuration Directory

Fish shell handles unregistered commands in `/usr/bin` through a specific function. This is located in your configuration directory at `~/.config/fish/`. We will be working with a file named `fish_command_not_found.fish`.

### 2. Create the Custom Script

Open your favorite text editor (I’m using **micro**) to create or edit the function file:

```bash
micro ~/.config/fish/functions/fish_command_not_found.fish

```

Then, add the following script:

```fish
function fish_command_not_found
    # Play the sound effect in the background (adjust the path to your file)
    pw-play /home/user/Music/error.mp3 >/dev/null 2>&1 &

    # Set the text color to neon orange
    set_color ff5f00

    # Your custom error message
    echo "[-] '$argv[1]', Command a tu Da!"

    # Reset text color to normal
    set_color normal
end

```

### 3. Save and Test

Save your changes and try typing a random, non-existent command in your terminal. If everything is set up correctly, you’ll see your custom orange message and hear the audio cue immediately.

![Terminal Screenshot](../sampel-1.png)

---
