package com.platformsandsolutions.hcpnphiesportalsimple.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.User.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Authority.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.User.class.getName() + ".authorities");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AckErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CRErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ComErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CovEliErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CovEliRespErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.OpeOutErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PayNotErrorMessages.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.DiagnosisSequence.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.InformationSequence.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationNotes.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailNotes.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailNotes.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Givens.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Prefixes.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Suffixes.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Texts.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ListCommunicationMediumEnum.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ListCommunicationReasonEnum.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ListEligibilityPurposeEnum.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ListRoleCodeEnum.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ListSpecialtyEnum.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Acknowledgement.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Acknowledgement.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Address.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".diagnoses");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".insurances");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".items");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".relateds");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".careTeams");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Claim.class.getName() + ".supportingInfos");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Related.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Payee.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CareTeam.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Diagnosis.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Insurance.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Accident.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Item.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Item.class.getName() + ".diagnosisSequences");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Item.class.getName() + ".informationSequences");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Item.class.getName() + ".udis");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Item.class.getName() + ".details");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.DetailItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.DetailItem.class.getName() + ".udis");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.DetailItem.class.getName() + ".subDetails");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.SubDetailItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.SubDetailItem.class.getName() + ".udis");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimResponse.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimResponse.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimResponse.class.getName() + ".items");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClaimResponse.class.getName() + ".totals");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationItem.class.getName() + ".notes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationItem.class.getName() + ".adjudications");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationItem.class.getName() + ".details");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailItem.class.getName() + ".notes");
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailItem.class.getName() + ".adjudications"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailItem.class.getName() + ".subDetails");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailItem.class.getName() + ".notes");
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailItem.class.getName() + ".adjudications"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Adjudication.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Total.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".basedOns");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".mediums");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".reasonCodes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".payloads");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".notes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Communication.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Attachment.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Payload.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Note.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CommunicationRequest.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CommunicationRequest.class.getName() + ".payloads");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CommunicationRequest.class.getName() + ".notes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Contact.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Coverage.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Coverage.class.getName() + ".classComponents");
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.Coverage.class.getName() + ".costToBeneficiaryComponents"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ClassComponent.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CostToBeneficiaryComponent.class.getName());
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.CostToBeneficiaryComponent.class.getName() + ".exceptions"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ExemptionComponent.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityRequest.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityRequest.class.getName() + ".errors");
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityRequest.class.getName() + ".purposes"
            );
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityRequest.class.getName() + ".coverages"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityResponse.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityResponse.class.getName() + ".errors");
            createCache(
                cm,
                com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityResponse.class.getName() + ".insurances"
            );
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ResponseInsurance.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ResponseInsurance.class.getName() + ".items");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ResponseInsuranceItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ResponseInsuranceItem.class.getName() + ".benefits");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.InsuranceBenefit.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Encounter.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Hospitalization.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName.class.getName() + ".givens");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName.class.getName() + ".prefixes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName.class.getName() + ".suffixes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName.class.getName() + ".texts");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Location.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.OperationOutcome.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.OperationOutcome.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Organization.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Organization.class.getName() + ".contacts");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Patient.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Patient.class.getName() + ".names");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PaymentNotice.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PaymentNotice.class.getName() + ".errors");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PaymentReconciliation.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PaymentReconciliation.class.getName() + ".details");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ReconciliationDetailItem.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Practitioner.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Practitioner.class.getName() + ".names");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PractitionerRole.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PractitionerRole.class.getName() + ".codes");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.PractitionerRole.class.getName() + ".specialties");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.ReferenceIdentifier.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.SupportingInfo.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Quantity.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Task.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.Task.class.getName() + ".inputs");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskInput.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskResponse.class.getName());
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskResponse.class.getName() + ".outputs");
            createCache(cm, com.platformsandsolutions.hcpnphiesportalsimple.domain.TaskOutput.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
