package com.platformsandsolutions.hcpnphiesportalsimple.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.platformsandsolutions.hcpnphiesportalsimple.IntegrationTest;
import com.platformsandsolutions.hcpnphiesportalsimple.domain.Texts;
import com.platformsandsolutions.hcpnphiesportalsimple.repository.TextsRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TextsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TextsResourceIT {

    private static final String DEFAULT_TEXT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/texts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TextsRepository textsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTextsMockMvc;

    private Texts texts;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Texts createEntity(EntityManager em) {
        Texts texts = new Texts().textName(DEFAULT_TEXT_NAME);
        return texts;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Texts createUpdatedEntity(EntityManager em) {
        Texts texts = new Texts().textName(UPDATED_TEXT_NAME);
        return texts;
    }

    @BeforeEach
    public void initTest() {
        texts = createEntity(em);
    }

    @Test
    @Transactional
    void createTexts() throws Exception {
        int databaseSizeBeforeCreate = textsRepository.findAll().size();
        // Create the Texts
        restTextsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(texts)))
            .andExpect(status().isCreated());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeCreate + 1);
        Texts testTexts = textsList.get(textsList.size() - 1);
        assertThat(testTexts.getTextName()).isEqualTo(DEFAULT_TEXT_NAME);
    }

    @Test
    @Transactional
    void createTextsWithExistingId() throws Exception {
        // Create the Texts with an existing ID
        texts.setId(1L);

        int databaseSizeBeforeCreate = textsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTextsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(texts)))
            .andExpect(status().isBadRequest());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTexts() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        // Get all the textsList
        restTextsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(texts.getId().intValue())))
            .andExpect(jsonPath("$.[*].textName").value(hasItem(DEFAULT_TEXT_NAME)));
    }

    @Test
    @Transactional
    void getTexts() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        // Get the texts
        restTextsMockMvc
            .perform(get(ENTITY_API_URL_ID, texts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(texts.getId().intValue()))
            .andExpect(jsonPath("$.textName").value(DEFAULT_TEXT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingTexts() throws Exception {
        // Get the texts
        restTextsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTexts() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        int databaseSizeBeforeUpdate = textsRepository.findAll().size();

        // Update the texts
        Texts updatedTexts = textsRepository.findById(texts.getId()).get();
        // Disconnect from session so that the updates on updatedTexts are not directly saved in db
        em.detach(updatedTexts);
        updatedTexts.textName(UPDATED_TEXT_NAME);

        restTextsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTexts.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTexts))
            )
            .andExpect(status().isOk());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
        Texts testTexts = textsList.get(textsList.size() - 1);
        assertThat(testTexts.getTextName()).isEqualTo(UPDATED_TEXT_NAME);
    }

    @Test
    @Transactional
    void putNonExistingTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, texts.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(texts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(texts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(texts)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTextsWithPatch() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        int databaseSizeBeforeUpdate = textsRepository.findAll().size();

        // Update the texts using partial update
        Texts partialUpdatedTexts = new Texts();
        partialUpdatedTexts.setId(texts.getId());

        restTextsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTexts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTexts))
            )
            .andExpect(status().isOk());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
        Texts testTexts = textsList.get(textsList.size() - 1);
        assertThat(testTexts.getTextName()).isEqualTo(DEFAULT_TEXT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateTextsWithPatch() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        int databaseSizeBeforeUpdate = textsRepository.findAll().size();

        // Update the texts using partial update
        Texts partialUpdatedTexts = new Texts();
        partialUpdatedTexts.setId(texts.getId());

        partialUpdatedTexts.textName(UPDATED_TEXT_NAME);

        restTextsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTexts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTexts))
            )
            .andExpect(status().isOk());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
        Texts testTexts = textsList.get(textsList.size() - 1);
        assertThat(testTexts.getTextName()).isEqualTo(UPDATED_TEXT_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, texts.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(texts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(texts))
            )
            .andExpect(status().isBadRequest());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTexts() throws Exception {
        int databaseSizeBeforeUpdate = textsRepository.findAll().size();
        texts.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTextsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(texts)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Texts in the database
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTexts() throws Exception {
        // Initialize the database
        textsRepository.saveAndFlush(texts);

        int databaseSizeBeforeDelete = textsRepository.findAll().size();

        // Delete the texts
        restTextsMockMvc
            .perform(delete(ENTITY_API_URL_ID, texts.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Texts> textsList = textsRepository.findAll();
        assertThat(textsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
