{ pkgs, lib, ... }: let
  fmway-nix = builtins.fetchGit {
    url = "https://github.com/fmway/fmway.nix";
    ref = "refs/tags/v1.0.0";
  };

  inherit (import fmway-nix { inherit lib; }) initIDXFromDevbox;
in initIDXFromDevbox ../devbox.json pkgs (self: devbox: {
  # Which nixpkgs channel to use.
  channel = "unstable";

  # Use https://search.nixos.org/packages to find packages
  packages = with pkgs; [
    fish
    starship
  ];

  # Sets environment variables in the workspace
  env = {
    SHELL = "${lib.getExe pkgs.fish}";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "vscodevim.vim"
      "bradlc.vscode-tailwindcss"
      "denoland.vscode-deno"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = let
        inherit (devbox.shell) scripts;
      in {
        web = {
          command = lib.splitString " " scripts.dev;
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        starship-fish = "starship init fish >> ~/.config/fish/config.fish";
      };
      # Runs when the workspace is (re)started
      onStart = {
      };
    };
  };
})
