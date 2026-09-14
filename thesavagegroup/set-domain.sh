#!/usr/bin/env bash
# Point the site at a domain (and optionally a contact address).
#
#   ./set-domain.sh asquadcalledsavage.com hello@asquadcalledsavage.com
#   ./set-domain.sh www.thesavagegroup.com hello@thesavagegroup.com
#
# Rewrites CNAME, canonical + og:url tags, JSON-LD urls, sitemap.xml,
# robots.txt and every mailto:/contact address. Re-runnable: it reads the
# current values out of the files rather than assuming them.
set -euo pipefail
cd "$(dirname "$0")"

NEW_HOST="${1:-}"
NEW_MAIL="${2:-}"
[ -n "$NEW_HOST" ] || { echo "usage: $0 <host> [contact-email]" >&2; exit 1; }

OLD_HOST="$(head -n1 CNAME | tr -d '[:space:]')"
OLD_MAIL="$(grep -rhom1 'mailto:[^"]*' *.html | head -n1 | cut -d: -f2)"

files=(*.html *.xml *.txt)

if [ "$OLD_HOST" != "$NEW_HOST" ]; then
  sed -i "s|https://${OLD_HOST}|https://${NEW_HOST}|g" "${files[@]}"
  printf '%s\n' "$NEW_HOST" > CNAME
  echo "host   ${OLD_HOST} -> ${NEW_HOST}"
else
  echo "host   ${NEW_HOST} (unchanged)"
fi

if [ -n "$NEW_MAIL" ] && [ "$OLD_MAIL" != "$NEW_MAIL" ]; then
  sed -i "s|${OLD_MAIL}|${NEW_MAIL}|g" "${files[@]}"
  echo "email  ${OLD_MAIL} -> ${NEW_MAIL}"
elif [ -n "$NEW_MAIL" ]; then
  echo "email  ${NEW_MAIL} (unchanged)"
fi

echo
echo "remaining references:"
grep -rho 'https://[a-z0-9.-]*thesavagegroup[a-z.]*\|https://[a-z0-9.-]*asquadcalledsavage[a-z.]*\|[a-z]*@[a-z0-9.-]*\.[a-z]*' "${files[@]}" \
  | sort | uniq -c | sort -rn
