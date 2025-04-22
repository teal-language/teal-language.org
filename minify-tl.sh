#!/usr/bin/env bash

# used for minifying the standard library segment of tl.lua

cat "$1" | sed -z '
   s/[ \t\n][ \t\n]*/ /g;
   s/\([^>]\) \([=|]\)/\1\2/g;
   s/\([?:,=|]\) /\1/g;
   s,--\[\[[^]]*\]\],,g;
   s,\.\.\. ,...,g;
   s/[ \t\n][ \t\n]*/ /g;
   s,^ ,,;
   s, $,,;
'
