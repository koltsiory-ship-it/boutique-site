export default function Contact() {
  return (
    <div className="min-h-screen bg-fond py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-2xl w-full">

        {/* En-tête */}
        <p className="label-or text-center mb-4">Nous écrire</p>
        <h1 className="font-cormorant text-5xl font-light text-noir text-center leading-tight mb-4">
          Contactez-<em className="text-or">nous</em>
        </h1>
        <div className="w-8 h-px bg-or mx-auto mb-8" />
        <p className="text-muted text-sm font-light text-center leading-loose max-w-md mx-auto mb-16">
          Pour toute demande d'information, n'hésitez pas à nous envoyer un message.
          Notre équipe vous répondra dans les plus brefs délais.
        </p>

        {/* Formulaire */}
        <form className="flex flex-col gap-8">

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="label-or">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              className="bg-transparent border-b border-bordure py-3 text-noir text-sm font-light placeholder:text-muted/50 focus:outline-none focus:border-or transition-colors duration-200"
              placeholder="Votre nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-or">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              className="bg-transparent border-b border-bordure py-3 text-noir text-sm font-light placeholder:text-muted/50 focus:outline-none focus:border-or transition-colors duration-200"
              placeholder="votre@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="label-or">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="bg-transparent border-b border-bordure py-3 text-noir text-sm font-light placeholder:text-muted/50 focus:outline-none focus:border-or transition-colors duration-200 resize-none"
              placeholder="Comment pouvons-nous vous aider ?"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button type="submit" className="btn-or">
              Envoyer le message
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}