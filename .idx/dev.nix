# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, lib, ... }: let
  fmway-nix = builtins.fetchGit {
    url = "https://github.com/fmway/fmway.nix";
    ref = "refs/tags/v1.0.0";
  };

  inherit (import fmway-nix { inherit lib; }) initIDXFromDevbox;
in initIDXFromDevbox ../devbox.json pkgs (self: devbox: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = with pkgs; [
  ];

  # Sets environment variables in the workspace
  env = {};
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
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
})
