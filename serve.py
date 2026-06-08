#!/usr/bin/env python3
"""Tiny static dev server with no-cache headers + IPv4 bind.

Why: phones aggressively cache static assets, so edits don't show up without a
hard refresh. Sending no-store/no-cache makes every reload fetch the latest.

Usage: python serve.py [port] [directory]
Defaults: port 5057, directory = folder containing this script.
"""
import os
import sys
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass  # quiet


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5057
    directory = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__))
    handler = functools.partial(NoCacheHandler, directory=directory)
    httpd = ThreadingHTTPServer(("0.0.0.0", port), handler)
    print(f"Serving {directory} on http://0.0.0.0:{port} (no-cache, IPv4)")
    httpd.serve_forever()
