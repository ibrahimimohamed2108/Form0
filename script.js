document.addEventListener('DOMContentLoaded', function() {
    // Attendez que le document soit chargé

    // Récupérez le formulaire par son identifiant
    const form = document.getElementById('cvForm');

    // Ajoutez un écouteur d'événements pour le formulaire lorsqu'il est soumis
    form.addEventListener('submit', function(event) {
        // Empêchez le comportement par défaut du formulaire

        // Récupérez les éléments d'entrée
        const nomInput = document.getElementById('nom');
        const prénomInput = document.getElementById('prénom');
        const numerodutéléphoneInput = document.getElementById('numerodutéléphone');
        const emailInput = document.getElementById('email');
        const birthdayInput = document.getElementById('birthday');

        // Vérifiez si le numéro de téléphone contient uniquement des chiffres
        if (!/^[0-9]+$/.test(numerodutéléphoneInput.value)) {
            alert('Le numéro de téléphone doit contenir que des chiffres.');
            event.preventDefault();
        }

        // Vérifiez si l'e-mail est valide en utilisant une expression régulière
        if (!isValidEmail(emailInput.value)) {
            alert('Veuillez entrer une adresse e-mail valide.');
            event.preventDefault();
        }

        // Validez les champs "Nom" et "Prénom"
        if (!NomPrenomValides()) {
            event.preventDefault();
        }

        // Vérifiez l'âge (au moins 18 ans)
        if (!isAdult(birthdayInput.value)) {
            alert('Vous devez avoir au moins 18 ans.');
            event.preventDefault();
        }
    });

    // Fonction pour valider une adresse e-mail en utilisant une expression régulière
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    // Fonction pour vérifier si la personne a au moins 18 ans
    function isAdult(birthdate) {
        const today = new Date();
        const birthdateObj = new Date(birthdate);
        const age = today.getFullYear() - birthdateObj.getFullYear();
        const monthDiff = today.getMonth() - birthdateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
            age--; // Ajuste l'âge si la date de naissance n'a pas encore eu lieu cette année
        }

        return age >= 18;
    }

    // Fonction pour valider les champs "Nom" et "Prénom"
    function NomPrenomValides() {
        const nom = document.getElementById('nom').value;
        const prénom = document.getElementById('prénom').value;

        if (!/^[A-Za-z\s]*$/.test(nom) || !/^[A-Za-z\s]*$/.test(prénom)) {
            alert("Les champs Nom et Prénom ne doivent contenir que des lettres alphabétiques et des espaces.");
            return false; // Empêche la soumission du formulaire
        }
        // Le formulaire est valide ; vous pouvez soumettre les données
        return true;
    }
});
