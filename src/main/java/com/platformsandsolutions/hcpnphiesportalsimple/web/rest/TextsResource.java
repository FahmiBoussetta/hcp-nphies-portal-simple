package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Texts;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.TextsRepository;
import com.platformsandsolutions.hcpnphiesportalsimple.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.platformsandsolutions.hcpnphiesportalsimple.domain.Texts}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TextsResource {

    private final Logger log = LoggerFactory.getLogger(TextsResource.class);

    private static final String ENTITY_NAME = "texts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TextsRepository textsRepository;

    public TextsResource(TextsRepository textsRepository) {
        this.textsRepository = textsRepository;
    }

    /**
     * {@code POST  /texts} : Create a new texts.
     *
     * @param texts the texts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new texts, or with status {@code 400 (Bad Request)} if the texts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/texts")
    public ResponseEntity<Texts> createTexts(@RequestBody Texts texts) throws URISyntaxException {
        log.debug("REST request to save Texts : {}", texts);
        if (texts.getId() != null) {
            throw new BadRequestAlertException("A new texts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Texts result = textsRepository.save(texts);
        return ResponseEntity
            .created(new URI("/api/texts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /texts/:id} : Updates an existing texts.
     *
     * @param id the id of the texts to save.
     * @param texts the texts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated texts,
     * or with status {@code 400 (Bad Request)} if the texts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the texts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/texts/{id}")
    public ResponseEntity<Texts> updateTexts(@PathVariable(value = "id", required = false) final Long id, @RequestBody Texts texts)
        throws URISyntaxException {
        log.debug("REST request to update Texts : {}, {}", id, texts);
        if (texts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, texts.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!textsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Texts result = textsRepository.save(texts);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, texts.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /texts/:id} : Partial updates given fields of an existing texts, field will ignore if it is null
     *
     * @param id the id of the texts to save.
     * @param texts the texts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated texts,
     * or with status {@code 400 (Bad Request)} if the texts is not valid,
     * or with status {@code 404 (Not Found)} if the texts is not found,
     * or with status {@code 500 (Internal Server Error)} if the texts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/texts/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Texts> partialUpdateTexts(@PathVariable(value = "id", required = false) final Long id, @RequestBody Texts texts)
        throws URISyntaxException {
        log.debug("REST request to partial update Texts partially : {}, {}", id, texts);
        if (texts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, texts.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!textsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Texts> result = textsRepository
            .findById(texts.getId())
            .map(
                existingTexts -> {
                    if (texts.getTextName() != null) {
                        existingTexts.setTextName(texts.getTextName());
                    }

                    return existingTexts;
                }
            )
            .map(textsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, texts.getId().toString())
        );
    }

    /**
     * {@code GET  /texts} : get all the texts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of texts in body.
     */
    @GetMapping("/texts")
    public List<Texts> getAllTexts() {
        log.debug("REST request to get all Texts");
        return textsRepository.findAll();
    }

    /**
     * {@code GET  /texts/:id} : get the "id" texts.
     *
     * @param id the id of the texts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the texts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/texts/{id}")
    public ResponseEntity<Texts> getTexts(@PathVariable Long id) {
        log.debug("REST request to get Texts : {}", id);
        Optional<Texts> texts = textsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(texts);
    }

    /**
     * {@code DELETE  /texts/:id} : delete the "id" texts.
     *
     * @param id the id of the texts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/texts/{id}")
    public ResponseEntity<Void> deleteTexts(@PathVariable Long id) {
        log.debug("REST request to delete Texts : {}", id);
        textsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
