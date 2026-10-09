import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { Branch } from '../types';
import { telephoneUrl } from '../lib/links';
import './menu-branches.css';

function whatsappUrl(value: string) {
  return /^https:\/\//i.test(value)
    ? value
    : `https://wa.me/${value.replace(/\D/g, '')}`;
}

export function BranchesSection({ branches }: { branches: Branch[] }) {
  return (
    <section
      id="branches"
      className="branches-section"
      aria-labelledby="branches-title"
    >
      <div className="container">
        <div className="branches-heading">
          <p className="eyebrow">Come hungry. Leave happy.</p>
          <h2 id="branches-title" className="section-title">
            Your table is waiting.
          </h2>
          <p>Find your nearest Sarang and make a meal of it.</p>
        </div>

        {branches.length > 0 ? (
          <div className="branch-list">
            {branches.map((branch, index) => (
              <article
                className="branch"
                key={branch.id}
                aria-labelledby={`branch-${branch.id}`}
              >
                <div className="branch-name">
                  <span className="branch-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`branch-${branch.id}`}>{branch.name}</h3>
                </div>
                <div className="branch-information">
                  {branch.address && (
                    <div className="branch-detail">
                      <MapPin size={19} aria-hidden="true" />
                      <address>{branch.address}</address>
                    </div>
                  )}
                  {branch.hours && branch.hours.length > 0 && (
                    <div className="branch-detail">
                      <Clock3 size={18} aria-hidden="true" />
                      <div>
                        <span className="sr-only">Opening hours: </span>
                        {branch.hours.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {branch.phone && (
                    <a
                      className="branch-detail branch-phone"
                      href={telephoneUrl(branch.phone)}
                    >
                      <Phone size={18} aria-hidden="true" />
                      <span>{branch.phone}</span>
                    </a>
                  )}
                </div>
                <div className="branch-actions">
                  <a
                    className="button button-outline branch-directions"
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Get directions to ${branch.name}`}
                  >
                    Get directions <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  {branch.whatsapp && (
                    <a
                      className="text-link branch-whatsapp"
                      href={whatsappUrl(branch.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Contact ${branch.name} on WhatsApp`}
                    >
                      <MessageCircle size={17} aria-hidden="true" /> WhatsApp
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="branch-fallback">
            <MapPin size={28} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Let’s find you a table.</h3>
              <p>
                Visit our Instagram for the latest branch details and opening
                hours.
              </p>
            </div>
            <a
              className="button button-outline"
              href="https://www.instagram.com/ayamkremes_my/"
              target="_blank"
              rel="noreferrer"
            >
              Find us on Instagram <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
