/**
 * BPSA: Formular für alle, die im Team mitmachen wollen
 * Ausführen im BPSA-Google-Account (berlinpsychedelicscience@gmail.com)
 * unter script.google.com. Erstellt das Formular und eine Antworttabelle
 * und legt beide in den BPSA-Ordner.
 * Gebaut nach dem PSNG-Formular "Mitmachen im Orga-Team".
 */
function createBpsaMitmachenForm() {
  var FOLDER_ID = '1i2XAtPG8Mfr_Hr4fG3o1BvraExCeIC-q'; // BPSA-Ordner
  var folder = DriveApp.getFolderById(FOLDER_ID);

  var form = FormApp.create('BPSA: Mitmachen im Team');
  form.setDescription(
    'Schön, dass du bei der Berlin Psychedelic Science Association mitmachen willst. ' +
    'Vorwissen brauchst du keins, Lust genügt. Das Ausfüllen dauert etwa 3 Minuten, ' +
    'danach melden wir uns bei dir.'
  );
  form.setConfirmationMessage(
    'Danke! Wir melden uns bald bei dir. Fragen gern an bpsa@psng.info'
  );
  form.setProgressBar(false);
  form.setAllowResponseEdits(false);

  // Kontakt
  form.addTextItem().setTitle('Vor- und Nachname').setRequired(true);

  var email = form.addTextItem().setTitle('E-Mail').setRequired(true);
  email.setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form.addTextItem()
    .setTitle('Handynummer')
    .setHelpText('Optional, für WhatsApp')
    .setRequired(false);

  // Die Talks sind offen für alle, also auch das Team: Studium ist keine Bedingung.
  form.addMultipleChoiceItem()
    .setTitle('Was machst du gerade?')
    .setChoiceValues([
      'Bachelor',
      'Master',
      'Staatsexamen (z. B. Medizin, Pharmazie)',
      'Promotion',
      'Berufstätig'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem()
    .setTitle('Fach, Hochschule oder Beruf')
    .setHelpText('z. B. Psychologie an der HU, Philosophie an der FU')
    .setRequired(false);

  // Mitarbeit: dieselben Rollen wie auf bpsa.psng.info unter "Mitmachen"
  form.addCheckboxItem()
    .setTitle('Wo möchtest du mitmachen?')
    .setHelpText('Mehrfachauswahl möglich')
    .setChoiceValues([
      'Talks organisieren (Speaker anfragen, Raum buchen, den Abend auf die Beine stellen)',
      'Moderieren (durch den Abend führen, die Fragerunde leiten)',
      'Social Media (Plakate, Reels und Rückblicke für Instagram)',
      'Filmclub und Social Events',
      'Selbst vortragen oder jemanden vorschlagen',
      'Weiß ich noch nicht'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Wie viel Zeit hast du realistisch pro Woche?')
    .setChoiceValues(['Unter 1 Stunde', '1 bis 2 Stunden', '2 bis 4 Stunden', 'Mehr als 4 Stunden'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Wie lange kannst du verlässlich dabei sein?')
    .setChoiceValues(['Bis Ende dieses Semesters', 'Etwa 6 Monate', '1 Jahr oder länger', 'Weiß ich noch nicht'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Was bringst du mit?')
    .setHelpText('Skills, Erfahrung, Ideen. Stichpunkte reichen.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Warum die BPSA?')
    .setHelpText('2 bis 3 Sätze')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('In welchen Sprachen kannst du arbeiten?')
    .setChoiceValues(['Deutsch', 'Englisch'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Wie hast du von uns erfahren?')
    .setChoiceValues(['WhatsApp-Gruppe', 'Instagram', 'Bei einem Talk', 'Website', 'Persönlich'])
    .showOtherOption(true)
    .setRequired(false);

  // Einverständnis (DSGVO)
  form.addCheckboxItem()
    .setTitle('Einverständnis')
    .setChoiceValues([
      'Ich bin einverstanden, dass die BPSA meine Angaben speichert, um meine Mitarbeit zu koordinieren. Löschung jederzeit per Mail an bpsa@psng.info.'
    ])
    .setRequired(true);

  // Antworten in eine eigene Tabelle im BPSA-Ordner
  var sheet = SpreadsheetApp.create('BPSA: Mitmachen (Antworten)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  DriveApp.getFileById(form.getId()).moveTo(folder);
  DriveApp.getFileById(sheet.getId()).moveTo(folder);

  Logger.log('Bearbeiten: ' + form.getEditUrl());
  Logger.log('Link zum Teilen: ' + form.getPublishedUrl());
  Logger.log('Antworten: ' + sheet.getUrl());
}
