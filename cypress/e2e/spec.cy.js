describe("User is on Comptia Login Page", () => {
  it("does not work", () => {
    cy.visit("https://prep.comptia.org/en/");
    cy.get("a").contains("Sign in").click({ force: true });

    cy.origin("https://comptiassostageb2c01.b2clogin.com/", () => {
      // Here after this click domain change to Google OAuth
      cy.get(".options #GoogleExchange").click();
    });

    cy.origin("accounts.google.com", () => {
      cy.url().should("include", "accounts.google.com");
      cy.get('input[type="email"]').click(); //Here trying to enter email on Google OAuth page
    });
  });

  /**
   * This always results in a 403 when trying to visit the google auth page.
   */
  it.only("does not work", () => {
    cy.visit(
      "https://comptiassostageb2c01.b2clogin.com/comptiassostageb2c01.onmicrosoft.com/b2c_1a_thinkmaxoptimizely_signuporsignin/oauth2/v2.0/authorize?client_id=03f644a5-74f7-4107-979a-1cdfc255ea44&redirect_uri=https%3A%2F%2Fprep.comptia.org%2Fsignin-oidc%2Faadb2c&response_type=code&scope=openid%20profile%20offline_access&code_challenge=0_0kX22a86oBJT3LvIhRG3tsXNPcIksfhUGOOk75kK8&code_challenge_method=S256&response_mode=form_post&nonce=638245391407162870.ODViYjNhMDUtZGI5NC00N2UzLWFhNDAtMzk1MzNmZjY4OTA2YWY2ZDg0NDktMzI4MC00ZDU2LTkyY2QtYmZjNTZjNzhhZWI5&client_info=1&x-client-brkrver=IDWeb.1.25.10.0&state=CfDJ8Ox10W4xffhIrGJMUrryY7trBBbO_TJuk3wJiuGWwTEK7LgNPTf1x6X9hTT_8HJKgU9wP3MTvlQQFSHrQcrUSu_OZGIuJxbL0tQ47xWFp8P4T6MO50RTvxiBfzyxeK5cdiUVlHbEGPPgaUqbOJcKUwNKVJvsCoNj4AIEl8ptw24kJM7UOylbxBjfyRsfCUQJS1mFIVVWbXQ-B29uuUPGdkqW48WjPL3bYT2_x4kLxY-2jH1cNXAZ-5AYeXRM-OaNlwgoQxgdd2TxaaCYgy_r66y98mh3wpZPbosQEr9kmvde4YZ6DAMBo0Y_9_LaqRmpGq-5ygtl0m_5WlSl5-mvR6VhZnrkPV7h4wWKYDYmAZ7tfsZZabZE58McJmw3WbEC1gt0Th9KTvCCm9zKtPqJSjjMBbuuZKNJCRhCS6dvyDycRQCf3M9zyKHrzoFD4kNwLDtWTSwigrhQR88--7IWPZlTuNjuYk1JC4cYI6uplR3d&ui_locales=en-AU&x-client-SKU=ID_NET6_0&x-client-ver=6.25.1.0"
    );
    cy.get(".options #GoogleExchange").click();
    cy.origin("https://accounts.google.com", () => {
      cy.url().should("include", "accounts.google.com");
      cy.get('input[type="email"]').click(); //Here trying to enter email on Google OAuth page
    });
  });

  it("works", () => {
    cy.visit(
      "https://accounts.google.com/v3/signin/identifier?dsh=S-888953619%3A1688943034074580&client_id=345078337410-1ai4hap8uev9l1dgfidftbo6gn5622j7.apps.googleusercontent.com&o2v=1&redirect_uri=https%3A%2F%2Fcomptiassostageb2c01.b2clogin.com%2Fcomptiassostageb2c01.onmicrosoft.com%2Foauth2%2Fauthresp&response_type=code&scope=email+profile&service=lso&state=StateProperties%3DeyJTSUQiOiJ4LW1zLWNwaW0tcmM6MTNjODlmMmUtMWMxZi00YTM4LWE2YjAtMGU5NGNlZGZhMjE0IiwiVElEIjoiODJiYjEwMDctNDk5Ni00MzExLThlZGMtMTBjNjczMjQ4MDVmIiwiVE9JRCI6IjJkNDlmNjdhLWUyYzUtNGRmMS05ZDI2LTE0YjQzZTAxZGVkOCJ9&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAOFOcvLj6hxXinQfOsM4IRa0RS7419DwqxPP8ve8s_USYjyo3Mqt8z822W9QNXtvWiTUjzA6x_ZB9lub3CiLzeELbQzAro3gwV0D8_2CdXoz8GQ4BdvKu5yyk8M04ImA9zj01kKeUso6t0h35CyWjiqv9QGR7GGJ-8K9RtZrsj-9Hg5LqRKUw-o8MQSUS4GFJrvcyYOih2oCeUSEDY6AzW7CDvZlMjx2ql_0VQUxyYOxYzpOkf0E2lvTDHywheEdDiC1pg8Uu1HpvQN5u-seu_h14MLbMtA-eYo5olmYScc0WHWJwBxhA7jWBDhFQ6CXEIm986Lvv_CMv84_7K-EIzrYGf_oChaepwdMnc69DPkVVQsVeNh76iVXM-Ea6eNXh83QunC51IAUoxKh1yRO3E483KcC1XnCcM_kPxGwq6ydNLpX3_Ov_bskS-1T6Xg7p5pZEO_2kt9X1CkKgB8Gwn-2I3bO87U67yW30XeBdpe5W8mG_4%26as%3DS-888953619%253A1688943034074580%26client_id%3D345078337410-1ai4hap8uev9l1dgfidftbo6gn5622j7.apps.googleusercontent.com%23&app_domain=https%3A%2F%2Fcomptiassostageb2c01.b2clogin.com&rart=ANgoxce93HCTbfIrLOoR1BehXUmTPGU_ASEgR3LuyazsbSnCOF2SBgC5wIswQTmulIxyvbQx7ZLFq3JWM8d0SwEGzfqskAuX3A"
    );
    cy.url().should("include", "accounts.google.com");
    cy.get('input[type="email"]').click(); //Here trying to enter email on Google OAuth page
  });
});
