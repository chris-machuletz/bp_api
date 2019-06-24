const {body} = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'createBewohner': {
            return [
                body('nachname', 'Nachname nicht vorhanden oder fehlerhaft').exists(),
                body('vorname', 'Vorname nicht vorhanden oder fehlerhaft').exists(),
                body('zimmernummer', 'Zimmernummer fehlerhaft').isInt().exists(),
                body('pflegegrad', 'Pflegegrad fehlerhaft').isInt().exists(),
                body('geburtsdatum', `Datum muss im Format 'YYYY-MM-DD' sein`).matches(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])/).exists(),
                body('geschlecht', `Geschlecht kann entweder 'm', 'w' oder 'd' enthalten`).isIn(['m','w','d'])
            ]
        }
    }
}

const {validationResult} = require('express-validator/check');

exports.createBewohner = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if(!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        const {nachname, vorname, zimmernummer, pflegegrad, geburtsdatum, geschlecht} = req.body;

        const bewohner = await bewohner.create({
            nachname, vorname, zimmernummer, pflegegrad, geburtsdatum, geschlecht
        })

        res.json(bewohner)
    } catch (error) {
        return next(error)
    }
}