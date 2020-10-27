# PR Checklist 

1. Make sure app-consts.ts is not committed.
2. Add unit tests for your changes.
3. Manually test the app for regressions.


# Deployment checklist + walkthrough

1. Make sure app-consts.ts is not commited, but does contain:
    * The client id
    * The client secret
    * The corrent redirect uri: https://spotifun-d2f93.firebaseapp.com/

2. Run `npm run build`.
3. Run `Firebase deploy`.
